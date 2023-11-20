import { Client } from 'pg';
import 'dotenv/config';

try {
  const client = new Client({
    connectionString: process.env.DB_BASE_URL,
  });

  async function main() {
    await client.connect();

    const res = await client.query(
      `SELECT datname FROM pg_catalog.pg_database WHERE datname = '${process.env.DB_NAME}'`,
    );

    if (res.rowCount === 0) {
      console.log(`${process.env.DB_NAME} database not found.`);
    } else {
      await client.query(`DROP DATABASE "${process.env.DB_NAME}";`);
      console.log(`${process.env.DB_NAME} database droped.`);
    }

    client.end();
  }

  main();
} catch (error) {
  console.log(error);

  console.log(
    "Error connecting do database, run the command 'createdb <user_name>' and try again.",
  );
}
