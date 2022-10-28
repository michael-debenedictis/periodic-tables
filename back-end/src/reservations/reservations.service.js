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

async function create(NewReservation) {
  return knex('reservations')
    .insert(NewReservation)
    .returning('*')
    .then((createdRecords) => createdRecords[0])
}


module.exports = {
  list,
  create,
};