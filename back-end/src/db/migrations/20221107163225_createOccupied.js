
exports.up = function(knex) {
  return knex.schema.createTable('occupied', (occupied) => {
    occupied.increments('occupied_id').primary();
    occupied.integer('table_id');
    occupied.integer('reservation_id');
    occupied.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('occupied');
};

