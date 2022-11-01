const knex = require('../db/connection');

async function create(newTable) {
  return knex('tables')
    .insert(newTable)
    .returning('*')
    .then((createdRecords) => createdRecords[0])
}

module.exports = {
  create,
}