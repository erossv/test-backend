// src/services/taskService.js
const TaskModel = require('../models/taskModel');

class TaskService {
    static async getTasks(userId, paginationInfo) {
        try {
            return await TaskModel.getTasks(userId, paginationInfo);
        } catch (error) {
            console.error(`Error fetching all tasks: ${error.message}`);
            throw new Error('Failed to fetch tasks.');
        }
    }

    static async createTask(userId, taskInfo) {
        try {
            return await TaskModel.createTask(userId, taskInfo);
        } catch (error) {
            console.error(`Failed to create task: ${error.message}`);
            throw new Error('Failed to create task.');
        }
    }

    static async updateTask(userId, taskId, taskInfo) {
        try {
            return await TaskModel.updateTask(userId, taskId, taskInfo);
        } catch (error) {
            console.error(`Error updating task with ID ${taskId}: ${error.message}`);
            throw new Error(`Failed to update task with ID ${taskId}.`);
        }
    }

    static async deleteTask(userId, taskId) {
        try {
            return await TaskModel.deleteTask(userId, taskId);
        } catch (error) {
            console.error(`Error deleting task with ID ${taskId}: ${error.message}`);
            throw new Error(`Failed to delete task with ID ${taskId}.`);
        }
    }
}

module.exports = TaskService;

