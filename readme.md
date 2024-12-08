# Node.js Express Application with TypeORM

## Project Overview
This project is a Node.js Express application integrated with TypeORM for database management. It is designed to demonstrate key concepts such as migrations, ORM, and unit testing.

## Features
- **Express Framework**: A robust Node.js web application framework.
- **TypeORM**: Object-relational mapping for database operations.
- **Database Support**: Easily configurable for relational databases.
- **Testing**: Integration with testing utilities for unit and integration tests.
- **Migrations**: Built-in migrations to manage database schema changes.

## Prerequisites
- Node.js (v16 or above)
- npm or yarn
- A supported relational database (e.g., PostgreSQL, MySQL, or SQLite)
- TypeScript setup (already included in the project)

## Installation
1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-folder>
```
2. Install dependencies:
```bash
npm install
```

## Database Configuration
The database connection is configured in `src/ormconfig.ts`. Update the configuration file with your database details:

```javascript
export const AppDataSource = new DataSource({
    type: 'postgres',  // Change to your database type
    host: 'localhost',
    port: 5432,
    username: 'your_username',
    password: 'your_password',
    database: 'your_database',
    synchronize: false, // Set to false in production
    logging: true,
    entities: [__dirname + '/entity/*.ts'],
    migrations: [__dirname + '/migration/*.ts'],
});
```

## Running the Project
### Development Mode
To start the application in development mode:

```bash
npm run dev
```
This uses ts-node-dev to watch for changes and automatically restart the server.

### Build for Production
To compile the TypeScript code to JavaScript for production:

```bash
npm run build
```
The compiled files will be located in the dist/ directory.

### Start in Production
```bash
npm start
```

## Migrations
### Running Migrations
To run migrations and apply them to the database:

```bash
npm run migration:up
```

### Reverting Migrations
To revert the last applied migration:
```bash
npm run migration:down
```

### Creating a New Migration

```bash
npm run migration:create -- -n <MigrationName>
```

## Testing
### Running Tests
Unit and integration tests are located in the `src/test` directory. To run all tests:

```bash
npm test
```
## Scripts
- npm run dev: Start the application in development mode.
- npm run build: Compile TypeScript to JavaScript.
- npm start: Start the application in production mode.
- npm test: Run the test suite.
- npm run migration:up: Run all pending migrations.
- npm run migration:down: Revert the last migration.

## Folder Structure
- `src/entity/`: Contains the database entity models.
- `src/migration/`: Contains migration files.
- `src/controllers/`: Controllers handling HTTP requests and responses.
- `src/test/`: Unit and integration tests.

## Notes
- Ensure you have the correct database driver installed (e.g., `pg` for PostgreSQL, `mysql` for MySQL).
- Avoid setting `synchronize: true` in production to prevent accidental schema synchronization.