require('dotenv').config();
const pool = require('../models/db');

async function createUsersTable() {
  try {
    await pool.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        salt VARCHAR(255) NOT NULL
      );
    `);
    console.log('Users table created successfully');
  } catch (error) {
    console.error('Error creating users table:', error.message);
    throw error;
  }
}

async function createTasksTable() {
  try {
    await pool.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

      CREATE TABLE IF NOT EXISTS tasks (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        end_date DATE,
        status VARCHAR(50),
        user_id UUID REFERENCES users(id)
      );
    `);
    console.log('Tasks table created successfully');
  } catch (error) {
    console.error('Error creating tasks table:', error.message);
    throw error;
  }
}

async function initDb() {
  try {
    await createUsersTable();
    await createTasksTable();
    console.log('Database initialization successful');
  } catch (error) {
    console.error('Database initialization failed:', error.message);
  } finally {
    pool.end();
  }
}

initDb();
