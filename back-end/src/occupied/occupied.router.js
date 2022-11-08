const router = require('express').Router();
const controller = require('./occupied.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router.route('/:tableId/seat')
  .all(methodNotAllowed)

module.exports = router;