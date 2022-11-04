const knex = require('../db/connection');

async function create(newTable) {
  return knex('tables')
    .insert(newTable)
    .returning('*')
    .then((createdRecords) => createdRecords[0]);
}

async function list() {
  return knex('tables')
    .select('*')
    .orderBy('table_name');
}

async function read(tableId) {
  return knex('tables')
    .select('*')
    .where({ table_id: tableId})
    .then((createdRecords) => createdRecords[0])
}

async function seatReservation(tableUpdated) {
  return knex('tables')
    .select('*')
    .where({ table_id: tableUpdated.table_id })
    .update(tableUpdated, '*')
    .then((createdRecords) => createdRecords[0])
}

module.exports = {
  list,
  create,
  read,
  seatReservation,
}