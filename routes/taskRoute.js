// src/routes/taskRoute.js
const TaskController = require('../controllers/taskController');

function addTaskRoute(router) {
    router.get('/tasks', TaskController.getTasks);
    router.post('/task', TaskController.createTask);
    router.put('/tasks/:id', TaskController.updateTask);
    router.delete('/tasks/:id', TaskController.deleteTask);
}

module.exports = addTaskRoute;
