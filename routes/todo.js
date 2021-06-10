const express = require('express')
const router = express.Router();

const todoController = require('../controllers/todo-controller');

router.post('/todos',todoController.createTodo);
router.post('/update/:id',todoController.updateTodo);
router.get('/delete/:id',todoController.deleteTodo);

module.exports = router;