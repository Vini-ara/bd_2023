import * as path from 'path';
import { readFileSync } from 'fs';
import { Pool } from 'pg';
import 'dotenv/config';

async function main() {
  const sql = readFileSync(
    path.join(__dirname, '../../sql/schema.sql'),
    'utf-8',
  );

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  await pool.query(sql);

  console.log('Schema created');
  console.log('Seed data inserted');

  await pool.end();
}

main();
