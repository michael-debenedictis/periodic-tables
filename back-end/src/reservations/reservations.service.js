const knex = require('../db/connection');

async function list(date) {
  if (date) {
    return knex('reservations')
      .select('*')
      .where({ reservation_date: date })
  } else {
    return knex('reservations')
      .select('*')
  }
}

async function read(reservationId) {
  return knex('reservations')
    .select('*')
    .where({ reservation_id: reservationId })
    .returning('*')
    .then((createdRecords) => createdRecords[0])
}

async function create(NewReservation) {
  return knex('reservations')
    .insert(NewReservation)
    .returning('*')
    .then((createdRecords) => createdRecords[0])
}


module.exports = {
  list,
  read,
  create,
};