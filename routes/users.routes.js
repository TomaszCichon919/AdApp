const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users.controller');

router.get('/users', UserController.getAll);
router.get('/users/:id', UserController.getById);
router.post('/users', UserController.addNew);
router.put('/users/:id', UserController.edit);
router.delete('/users/:id', UserController.delete);

module.exports = router;