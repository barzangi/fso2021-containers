const express = require('express');
const router = express.Router();
const { getAsync } = require('../redis');

const configs = require('../util/config');

let visits = 0;

/* GET index data. */
router.get('/', async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

/* GET '/statistics' endpoint */
router.get('/statistics', async (req, res) => {
  const addedTodos = (await getAsync('added_todos')) || 0;
  res.status(200).json({ added_todos: Number(addedTodos) });
});

module.exports = router;
