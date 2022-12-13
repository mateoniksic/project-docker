// IMPORTS
const MYSQL = require('mysql');

// CONSTANTS
const DB_HOST = process.env.DB_HOST || 'database';
const DB_PORT = process.env.DB_PORT || '3306';
const DB_USER = process.env.DB_USER || 'admin';
const DB_PASSWORD = process.env.DB_PASSWORD || 'admin';
const DB_NAME = process.env.DB_NAME || 'db_app';
const DB_CONNECTION_LIMIT = process.env.DB_CONNECTION_LIMIT || 20;

// CONNECTION
module.exports = MYSQL.createPool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    connectionLimit: DB_CONNECTION_LIMIT
});