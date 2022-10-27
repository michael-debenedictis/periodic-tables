const knex = require('../db/connection');

async function list(date) {
  console.log(knex('reservations').select('*'))
  console.log('sup')
  if (date) {
    return knex('reservations')
      .select('*')
      // .where({ date: })
  } else {
    return knex('reservations')
      .select('*')
  }
}


module.exports = {
  list,
};