import request from 'supertest';
import http from 'http';

import { getServer, getAppDataSource } from './helpers/setup';
// import app from '../app';
import { DataSource } from 'typeorm';

let AppDataSource: DataSource;
let app: http.Server;

beforeAll(async () => {
  AppDataSource = getAppDataSource();
  app = getServer()
  // console.log("app", app);
});

// afterAll(async () => {
// });

describe('Employee API Routes', () => {
  test('GET /employee should return an empty array initially', async () => {
    const response = await request(app).get('/employee');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('POST /employee should create a new employee', async () => {
    const response = await request(app)
      .post('/employee')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        seniority: 5,
        is_mechanic: true,
        vehicle_certifications: ['Heavy Duty Vehicles'],
      });

    expect(response.status).toBe(201);
    expect(response.body.firstName).toBe('John');
    expect(response.body.lastName).toBe('Doe');
    expect(response.body.is_mechanic).toBe(true);
    expect(response.body.emp_id).not.toBe(null);
  });

  test('GET /employee should return the created employee', async () => {
    const response = await request(app).get('/employee');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].firstName).toBe('John');
  });

  test('PUT /employee/:empId should update an employee', async () => {
    const employeeResponse = await request(app)
      .post('/employee')
      .send({
        firstName: 'Jane',
        lastName: 'Smith',
        seniority: 3,
        is_mechanic: false,
        vehicle_certifications: ['Motorcycles'],
      });

    const empId = employeeResponse.body.emp_id;

    const updateResponse = await request(app)
      .put(`/employee/${empId}`)
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        seniority: 4,
        is_mechanic: true,
        vehicle_certifications: ['Cars', 'Motorcycles'],
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.lastName).toBe('Doe');
    expect(updateResponse.body.seniority).toBe(4);
  });

  test('DELETE /employee/:empId should delete an employee', async () => {
    const employeeResponse = await request(app)
      .post('/employee')
      .send({
        firstName: 'Mark',
        lastName: 'Johnson',
        seniority: 2,
        is_mechanic: true,
        vehicle_certifications: ['Light Vehicles'],
      });

    // console.log("employeeResponse", employeeResponse);
    const empId = employeeResponse.body.emp_id;
    console.log("empId", empId)

    const deleteResponse = await request(app).delete(`/employee/${empId}`);
    expect(deleteResponse.status).toBe(200);

    const fetchResponse = await request(app).get(`/employee/${empId}`);
    expect(fetchResponse.status).toBe(404);
  });
});