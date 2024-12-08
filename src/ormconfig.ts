import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
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
});

export default AppDataSource;

// AppDataSource.initialize()
//     .then(() => {
//         console.log('Data Source has been initialized!');
//     })
//     .catch((err) => {
//         console.error('Error during Data Source initialization:', err);
//     });