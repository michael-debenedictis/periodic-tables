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


module.exports = {
  list,
};