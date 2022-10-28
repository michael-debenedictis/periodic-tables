const knex = require('../db/connection');

async function list(date) {
  return knex('reservations')
    .select('*')
}


module.exports = {
  list,
};