const express = require('express');
const { createTask, getTasks, assignTask, updateTaskStatus, deleteTask } = require('../controllers/taskController');
const { check } = require('express-validator');

const router = express.Router();

router.post('/tasks', [
  check('name').not().isEmpty().withMessage('Task name is required'),
  check('description').not().isEmpty().withMessage('Task description is required')
], createTask);

router.get('/tasks', getTasks);
router.put('/tasks/:id/assign', assignTask);
router.put('/tasks/:id/status', updateTaskStatus);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
