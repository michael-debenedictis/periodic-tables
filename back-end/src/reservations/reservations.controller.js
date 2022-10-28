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

async function list(req, res) {
  const date = req.query.date;
  // seed.filter((cur) => cur.reservation_date === date)
  const data = await service.list(date)
  res.json({
    data: data
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
