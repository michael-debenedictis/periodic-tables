const knex = require('../db/connection');

async function list(date, phoneNumber) {
  if (date) {
    return knex('reservations')
      .select('*')
      .where({ reservation_date: date })
      .whereNot({ status: 'finished'})
  } else if (phoneNumber) {
    return knex('reservations')
      .select('*')
      .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${phoneNumber.replace(/\D/g, "")}%`
      )
      .orderBy("reservation_date");
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

async function changeStatus(reservationId, status) {
  return knex('reservations')
    .select('*')
    .where({ reservation_id: reservationId })
    .update('status', status)
    .returning('*')
    .then((createdRecords) => createdRecords[0])
}

async function reservationRemove(reservationId) {
  return knex('reservations')
    .select('*')
    .where({ reservation_id: reservationId})
    .del()
}


module.exports = {
  list,
  read,
  create,
  changeStatus,
  reservationRemove,
};