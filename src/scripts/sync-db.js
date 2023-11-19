const path = require('path');
const { readFileSync } = require('fs');
const { Pool } = require('pg');
require('dotenv').config();

const sql = readFileSync(path.join(__dirname, '../../sql/schema.sql'), 'utf-8');

const pool = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  database: 'trabalhobd',
  password: process.env.DB_PASS,
  port: 5432,
});

pool.query(sql);
