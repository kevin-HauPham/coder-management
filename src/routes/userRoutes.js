const express = require('express');
const { createUser, getUsers, getUserTasks } = require('../controllers/userController');
const { check } = require('express-validator');

const router = express.Router();

router.post('/users', [
  check('name').not().isEmpty().withMessage('Name is required')
], createUser);

router.get('/users', getUsers);
router.get('/users/:id/tasks', getUserTasks);

module.exports = router;
