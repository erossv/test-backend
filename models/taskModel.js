// src/models/taskModel.js
const pool = require('./db');
const { v4: uuidv4 } = require('uuid');
const { formatTask, formatTasks } = require('./format')

const SELECT_ALL_TASKS = 'SELECT * FROM tasks WHERE user_id = $1 OFFSET $2 LIMIT $3';
const COUNT_ALL_TASKS = 'SELECT COUNT(*) FROM tasks WHERE user_id = $1';
const INSERT_TASK = 'INSERT INTO tasks (id, title, description, end_date, status, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
const UPDATE_TASK = 'UPDATE tasks SET title = $2, description = $3, end_date = $4, status = $5 WHERE id = $1 AND user_id = $6 RETURNING *';
const DELETE_TASK = 'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *';

class TaskModel {
    static async getTasks(userId, paginationInfo) {
        const { page, pageSize } = paginationInfo;
        try {
            const offset = page * pageSize;

            const result = await pool.query(SELECT_ALL_TASKS, [userId, offset, pageSize]);
            const tasks = formatTasks(result.rows);

            const totalCountResult = await pool.query(COUNT_ALL_TASKS, [userId]);
            const totalCount = parseInt(totalCountResult.rows[0].count);

            return { tasks, totalCount };

        } catch (error) {
            throw error;
        }
    }

    static async createTask(userId, taskInfo) {
        try {
            const { title, description, endDate, status } = taskInfo;
            const result = await pool.query(INSERT_TASK, [uuidv4(), title, description, endDate, status, userId]);
            return formatTask(result.rows[0]);
        } catch (error) {
            throw error;
        }
    }

    static async updateTask(userId, taskId, taskInfo) {
        const { title, description, endDate, status } = taskInfo;
        try {
            const result = await pool.query(UPDATE_TASK, [taskId, title, description, endDate, status, userId]);
            return formatTask(result.rows[0]);
        } catch (error) {
            throw error;
        }
    }

    static async deleteTask(userId, taskId) {
        try {
            const result = await pool.query(DELETE_TASK, [taskId, userId]);
            return formatTask(result.rows[0]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TaskModel;
