// src/models/userModel.js
const pool = require('./db');
const { v4: uuidv4 } = require('uuid');

const INSERT_USER = `
  INSERT INTO users (id, username, password, salt)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
`;

const SELECT_USER_BY_USERNAME = 'SELECT * FROM users WHERE username = $1';

class UserModel {
    static async save({ username, password, salt }) {
        try {
            const userId = uuidv4();
            const result = await pool.query(INSERT_USER, [userId, username, password, salt]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async getUserByUsername(username) {
        try {
            const result = await pool.query(SELECT_USER_BY_USERNAME, [username]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserModel;

