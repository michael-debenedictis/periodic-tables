const service = require('./tables.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function list(req, res) {
  const response = await service.list();
  res.json({
    data: response
  });
}

async function create(req, res) {
  const table = req.body.data;
  const response = await service.create(table);
  res.status(201).json({
    data: response
  });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [asyncErrorBoundary(create)],
}