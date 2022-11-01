const service = require('./tables.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function create(req, res) {
  const table = req.body.data;
  const response = await service.create(table);
  res.status(201).json({
    data: response
  });
}

module.exports = {
  create: [asyncErrorBoundary(create)],
}