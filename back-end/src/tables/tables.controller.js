const service = require('./tables.service');
const reservationsService = require('../reservations/reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function list(req, res) {
  const response = await service.list();
  res.json({
    data: response
  });
}

async function create(req, res) {
  const table = req.body.data;
  const response = await service.create(table);
  res.status(201).json({
    data: response
  });
}

async function seatReservation(req, res) {
  const table = res.locals.table;
  const reservationId = req.body.data.reservation_id;
  const tableUpdated = {
    ...table,
    reservation_id: reservationId
  };
  const response = await service.seatReservation(tableUpdated);
  res.status(200).json({
    data: response
  });

}

async function reservationFinish(req, res) { // tests wanted a response from a delete request so I had to delete the whole row in the table for table and create a new one with reservation_id null, rather than using a put and updating just that columns value
  const tableId = req.params.tableId;
  const table = await service.read(tableId);
  table.reservation_id = null;
  await service.reservationFinish(tableId);
  await service.create(table);
  res.status(200).json({
    data: table
  });
}

//middleware --------

async function dataProvided(req, res, next) {
  const data = req.body.data;
  if (!data) {
    next({status: 400, message: 'Data was not provided with request.'});
  } else {
    next();
  }
}

async function nameFieldValid(req, res, next) {
  const data = req.body.data;
  if (!data.table_name) {
    next({status: 400, message: 'table_name field not provided and or empty.'});
  } else if (data.table_name.length <= 1) {
    next({status: 400, message: 'The table_name field needs to be at least 2 characters in length'});
  } else {
    next();
  }
}

async function capacityFieldValid(req, res, next) {
  const data = req.body.data;
  if (!data.capacity) {
    next({status: 400, message: 'capacity field not provided and or empty.'});
  } else if (typeof data.capacity !== 'number') {
    next({status: 400, message: 'The capacity field needs to be of type number.'})
  } else if (data.capacity === 0) {
    next({status:400, message: 'The capacity field needs to be greater than 0.'});
  } else {
    next();
  }
}

async function reservationFieldValid(req, res, next) {
  const data = req.body.data;
  let reservationExists;
  if (!data.reservation_id) {
    next({status: 400, message: 'reservation_id field not provided and or empty.'});
    return
  }
  reservationExists = await reservationsService.read(data.reservation_id);
  if (reservationExists) {
    next();
  } else {
    next({status: 404, message: `${data.reservation_id} does not exist.`});
  }
}

async function tableCapacityAccomodates(req, res, next) {
  const tableId = req.params.tableId;
  res.locals.table = await service.read(tableId);
  const table = res.locals.table;
  const reservationId = req.body.data.reservation_id;
  const reservation = await reservationsService.read(reservationId);
  if (table.capacity < reservation.people) {
    next({status: 400, message: 'Party too large for table capacity.'});
  } else {
    next();
  }
}

async function tableNotOccupied(req, res, next) {
  const table = res.locals.table;
  if (table.reservation_id) {
    next({status: 400, message: 'Table already occupied.'});
  } else {
    next();
  }
}

async function isOccupied(req, res, next) {
  const table = await service.read(req.params.tableId);
  if (!table.reservation_id) {
    next({status: 400, message: 'table not occupied.'})
  } else {
    next();
  }
}

async function tableExists(req, res, next) {
  const table = await service.read(req.params.tableId);
  if (!table) {
    next({status: 404, message: `table_id ${req.params.tableId} doesnt exist.`});
  } else {
    next();
  }
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [asyncErrorBoundary(dataProvided), asyncErrorBoundary(nameFieldValid), asyncErrorBoundary(capacityFieldValid), asyncErrorBoundary(create)],
  seatReservation: [asyncErrorBoundary(dataProvided), asyncErrorBoundary(reservationFieldValid), asyncErrorBoundary(tableCapacityAccomodates), asyncErrorBoundary(tableNotOccupied), asyncErrorBoundary(seatReservation)],
  reservationFinish: [asyncErrorBoundary(tableExists), asyncErrorBoundary(isOccupied), asyncErrorBoundary(reservationFinish)],
}