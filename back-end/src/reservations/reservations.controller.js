const service = require('./reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');


//requests --------

async function list(req, res) {
  const date = req.query.date;
  const phoneNumber = req.query.mobile_number;
  const data = await service.list(date, phoneNumber)
  res.json({
    data: data
  });
}

async function read(req, res) {
  const reservationId = req.params.reservationId;
  const response = await service.read(reservationId);
  res.json({
    data: response
  });
}

async function create(req, res) {
  const NewReservation = req.body.data;
  const response = await service.create(NewReservation);
  res.status(201).json({
    data: response
  });
}

async function changeStatus(req, res) {
  const reservationId = req.params.reservationId;
  const status = req.body.data.status;
  const response = await service.changeStatus(reservationId, status);
  res.status(200).json({
    data: response
  });
}

async function reservationRemove(req, res) {
  const reservationId = req.params.reservationId;
  const response = await service.reservationRemove(reservationId);
  res.status(204).json({
    data: response
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

async function fieldPopulated(req, res, next) {
  const data = req.body.data;
  if (!data.first_name) {
    next({status: 400, message: "first_name field not provided and or empty"});
  } else if (!data.last_name) {
    next({status: 400, message: "last_name field not provided and or empty"});
  } else if (!data.mobile_number) {
    next({status: 400, message: "mobile_number field not provided and or empty"});
  } else if (!data.reservation_date) {
    next({status: 400, message: "reservation_date field not provided and or empty"});
  } else if (!data.reservation_time) {
    next({status: 400, message: "reservation_time field not provided and or empty"});
  } else if (!data.people) {
    next({status: 400, message: "people field not provided and or empty"});
  } else {
    next();
  }
}
  
async function dateValid(req, res, next) {
  const date = req.body.data.reservation_date;
  const dateFormat = /\d\d\d\d-\d\d-\d\d/;
  if (!dateFormat.test(date)) {
    next({status: 400, message: 'reservation_date must be formatted YYYY-MM-DD'});
  } else {
    next();
  }
}

async function timeValid(req, res, next) {
  const time = req.body.data.reservation_time;
  const timeFormat = /\d\d:\d\d/;
  if (!timeFormat.test(time)) {
    next({status: 400, message: 'reservation_time must be formatted HH:MM'})
  } else {
    next();
  }
}

async function validPeople(req, res, next) {
  const ppl = req.body.data.people;
  if (typeof ppl !== 'number') {
    next({status: 400, message: 'The people field must be of type "number".'});
  } else if (ppl < 1) {
    next({status: 400, message: 'The people field must be greater than 1'});
  } else {
    next();
  }
}

async function isWorkingDateAndTime(req, res, next) { //run after the dateValid and timeValid functions in the pipeline
  const msUtcReservation = reservationConvertUTC(req.body.data.reservation_date, req.body.data.reservation_time);
  const msUtcNow = Date.now();
  const date = new Date(`${req.body.data.reservation_date}T${req.body.data.reservation_time}`);
  const reservationEarliest = new Date(`${req.body.data.reservation_date}T10:30:00`);
  const reservationLatest = new Date(`${req.body.data.reservation_date}T21:30:00`);
  if (msUtcReservation < msUtcNow) {
    next({status: 400, message: 'The provided date and or time has already passed.'});
  } else if (date.getDay() === 2) {
    next({status: 400, message: 'Reservation falls on a Tuesday (non working day).'});
  } else if (date < reservationEarliest) {
    next({status: 400, message: 'Reservations must be after 10:30 AM.'});
  } else if (date > reservationLatest) {
    next({status: 400, message: 'Reservations must be prior to 9:30 PM.'});
  } else {
    next();
  }
}

async function validStatus(req, res, next) {
  const newReservation = req.body.data;
  if (newReservation.status === 'seated') {
    next({status: 400, message: `Reservation must not start with status: ${newReservation.status}`});
  } else if (newReservation.status === 'finished') {
    next({status: 400, message: `Reservation must not start with status: ${newReservation.status}`});
  } else {
    next();
  }
}

async function idValid(req, res, next) {
  const reservationId = req.params.reservationId;
  const valid = await service.read(reservationId);
  if (!valid) {
    next({status: 404, message: `${reservationId} doesnt exist as a reservation_id.`})
  } else {
    next();
  }
}

async function validStatusData(req, res, next) {
  const newStatus = req.body.data.status;
  const reservation = await service.read(req.params.reservationId);
  const curStatus = reservation.status;
  if (curStatus === 'finished') {
    next({status: 400, message: 'reservation status is currently already finished.'});
  }
  
  if (newStatus === 'booked') {
    next();
  } else if (newStatus === 'seated') {
    next();
  } else if (newStatus === 'finished') {
    next();
  } else {
    next({status: 400, message: 'unknown status provided.'});
  }
}

//helpr functions --------

function reservationConvertUTC(date, time) {
  const ymdArray = date.split('-') // [year, month, date]
  const timeArray = time.split(':') // [hrs, min]
  const all = [...ymdArray, ...timeArray];
  return Date.UTC(...all)
}




module.exports = {
  list: asyncErrorBoundary(list),
  read: asyncErrorBoundary(read),
  create: [asyncErrorBoundary(dataProvided), asyncErrorBoundary(fieldPopulated), asyncErrorBoundary(dateValid), asyncErrorBoundary(timeValid), asyncErrorBoundary(validPeople), asyncErrorBoundary(isWorkingDateAndTime), asyncErrorBoundary(validStatus), asyncErrorBoundary(create)],
  changeStatus: [asyncErrorBoundary(idValid), asyncErrorBoundary(validStatusData), asyncErrorBoundary(changeStatus)],
  reservationRemove: [asyncErrorBoundary(reservationRemove)],
};
