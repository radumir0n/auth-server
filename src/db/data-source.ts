import { DataSource } from 'typeorm';

import { User } from './entities/index';

export const dataSource = new DataSource({
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [User],
    migrations: ['src/db/migrations/*.{js,ts}'],
});
