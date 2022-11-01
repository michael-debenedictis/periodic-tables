const service = require('./reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
/**
 * List handler for reservation resources
 */
const seed = [
  {
    "first_name": "Rick",
    "last_name": "Sanchez",
    "mobile_number": "202-555-0164",
    "reservation_date": "2020-12-31",
    "reservation_time": "20:00:00",
    "people": 6,
    "created_at": "2020-12-10T08:30:32.326Z",
    "updated_at": "2020-12-10T08:30:32.326Z"
  },
  {
    "first_name": "Frank",
    "last_name": "Palicky",
    "mobile_number": "202-555-0153",
    "reservation_date": "2020-12-30",
    "reservation_time": "20:00",
    "people": 1,
    "created_at": "2020-12-10T08:31:32.326Z",
    "updated_at": "2020-12-10T08:31:32.326Z"
  },
  {
    "first_name": "Bird",
    "last_name": "Person",
    "mobile_number": "808-555-0141",
    "reservation_date": "2020-12-30",
    "reservation_time": "18:00",
    "people": 1,
    "created_at": "2020-12-10T08:31:32.326Z",
    "updated_at": "2020-12-10T08:31:32.326Z"
  },
  {
    "first_name": "Tiger",
    "last_name": "Lion",
    "mobile_number": "808-555-0140",
    "reservation_date": "2025-12-30",
    "reservation_time": "18:00",
    "people": 3,
    "created_at": "2020-12-10T08:31:32.326Z",
    "updated_at": "2020-12-10T08:31:32.326Z"
  },
  {
    "first_name": "Anthony",
    "last_name": "Charboneau",
    "mobile_number": "620-646-8897",
    "reservation_date": "2026-12-30",
    "reservation_time": "18:00",
    "people": 2,
    "created_at": "2020-12-10T08:31:32.326Z",
    "updated_at": "2020-12-10T08:31:32.326Z"
  },
  {
    "first_name": "Anthony",
    "last_name": "Charboneau",
    "mobile_number": "620-646-8897",
    "reservation_date": "2022-10-27",
    "reservation_time": "18:00",
    "people": 2,
    "created_at": "2020-12-10T08:31:32.326Z",
    "updated_at": "2020-12-10T08:31:32.326Z"
  },
  {
    "first_name": "Anthony",
    "last_name": "Charboneau",
    "mobile_number": "620-646-8897",
    "reservation_date": "2022-10-28",
    "reservation_time": "18:00",
    "people": 2,
    "created_at": "2020-12-10T08:31:32.326Z",
    "updated_at": "2020-12-10T08:31:32.326Z"
  },
  {
    "first_name": "Anthony",
    "last_name": "Charboneau",
    "mobile_number": "620-646-8897",
    "reservation_date": "2022-10-29",
    "reservation_time": "18:00",
    "people": 2,
    "created_at": "2020-12-10T08:31:32.326Z",
    "updated_at": "2020-12-10T08:31:32.326Z"
  }
]

//requests --------

async function list(req, res) {
  const date = req.query.date;
  // seed.filter((cur) => cur.reservation_date === date)
  const data = await service.list(date)
  res.json({
    data: data
  });
}

async function create(req, res) {
  const NewReservation = req.body.data;
  const response = await service.create(NewReservation);
  res.status(201).json({
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

//helpr functions --------

function reservationConvertUTC(date, time) {
  const ymdArray = date.split('-') // [year, month, date]
  const timeArray = time.split(':') // [hrs, min]
  const all = [...ymdArray, ...timeArray];
  return Date.UTC(...all)
}




module.exports = {
  list: asyncErrorBoundary(list),
  create: [asyncErrorBoundary(dataProvided), asyncErrorBoundary(fieldPopulated), asyncErrorBoundary(dateValid), asyncErrorBoundary(timeValid), asyncErrorBoundary(validPeople), asyncErrorBoundary(isWorkingDateAndTime), asyncErrorBoundary(create)],
};
