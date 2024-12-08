import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../../ormconfig';
import app from '../../app';
import http, { createServer } from 'http';


let appDataSource: DataSource;
let server: http.Server;

beforeAll(async () => {
    // Initialize database
    await AppDataSource.initialize();

    // Start the server (use a random port to avoid conflicts)
    server = await createServer(app).listen(3000);
    // console.log("server started");

    // console.log(`Test server running at port ${(server.address() as any).port}`);
});

afterAll(async () => {
    // Close database connection
    await AppDataSource.destroy();

    // Close the server
    if (server) {
        server.close();
    }
});

export const getServer = () => server; // Utility to share server instance
export const getAppDataSource = () => AppDataSource; // Utility to share server instance
