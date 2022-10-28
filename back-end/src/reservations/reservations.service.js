const knex = require('../db/connection');

async function list(date) {
  return knex('reservations')
    .select('*')
    .where({ reservation_date: date })
}


module.exports = {
  list,
};