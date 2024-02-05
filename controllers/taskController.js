// src/controllers/taskController.js
const TaskService = require('../services/taskService');

const HTTP_STATUS_CODE = {
    OK: 200,
    CREATED: 201,
    SERVER_ERROR: 500
};

const ERROR_MESSAGES = {
    INTERNAL_SERVER_ERROR: "Internal Server Error"
};

class TaskController {
    static async getTasks(ctx) {
        try {
            const userId = ctx.state.user.id;
            const paginationInfo = ctx.request.query;
            const { totalCount, tasks } = await TaskService.getTasks(userId, paginationInfo);
            ctx.status = HTTP_STATUS_CODE.OK;
            ctx.body = { totalCount, data: tasks };
        } catch (error) {
            ctx.status = HTTP_STATUS_CODE.SERVER_ERROR;
            ctx.body = ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
        }
    }

    static async createTask(ctx) {
        try {
            const userId = ctx.state.user.id;
            const taskInfo = ctx.request.body;
            const task = await TaskService.createTask(userId, taskInfo);
            ctx.status = HTTP_STATUS_CODE.CREATED;
            ctx.body = task;
        } catch (error) {
            ctx.status = HTTP_STATUS_CODE.SERVER_ERROR;
            ctx.body = ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
        }
    }

    static async updateTask(ctx) {
        const { id: taskId } = ctx.params;
        const userId = ctx.state.user.id;
        const taskInfo = ctx.request.body;
        try {
            const task = await TaskService.updateTask(userId, taskId, taskInfo);
            ctx.status = HTTP_STATUS_CODE.OK;
            ctx.body = task;
        } catch (error) {
            ctx.status = HTTP_STATUS_CODE.SERVER_ERROR;
            ctx.body = ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
        }
    }

    static async deleteTask(ctx) {
        const userId = ctx.state.user.id;
        const { id: taskId } = ctx.params;
        try {
            const task = await TaskService.deleteTask(userId, taskId);
            ctx.status = HTTP_STATUS_CODE.OK;
            ctx.body = task;
        } catch (error) {
            ctx.status = HTTP_STATUS_CODE.SERVER_ERROR;
            ctx.body = ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
        }
    }
}

module.exports = TaskController;