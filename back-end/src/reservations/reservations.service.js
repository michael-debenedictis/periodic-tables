const knex = require('../db/connection');

async function list(date) {
  console.log(date, 'sup')
  return knex('reservations')
    .select('*')
}


module.exports = {
  list,
};