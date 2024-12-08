import { DataSource } from 'typeorm';

const datasource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.NODE_ENV !== "test" ? 'sanket1' : 'sanket1_test',
    password: process.env.NODE_ENV !== "test" ? 'password' : 'password_test',
    database: process.env.NODE_ENV !== "test" ? 'projectwork_db' : 'projectwork_db_test',
    synchronize: false,
    logging: false,
    dropSchema: false,
    entities: ['src/entity/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
}); // config is one that is defined in datasource.config.ts file
datasource.initialize();
export default datasource;