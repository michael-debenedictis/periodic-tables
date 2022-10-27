const service = require('./reservations.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const data = await service.list()
  console.log(data)
  res.json({
    data: data
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
