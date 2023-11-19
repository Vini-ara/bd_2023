import { Injectable, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DbService extends Pool implements OnModuleInit {
  constructor() {
    super({
      user: process.env.DB_USER,
      host: 'localhost',
      database: 'trabalhobd',
      password: process.env.DB_PASS,
      port: 5432,
    });
  }

  async onModuleInit() {
    await this.connect();
  }
}
