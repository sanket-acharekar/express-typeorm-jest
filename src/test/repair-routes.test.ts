import request from 'supertest';
import http from 'http';

import { getServer, getAppDataSource } from './helpers/setup';
// import app from '../app';
import { DataSource } from 'typeorm';
import { VehicleType } from '../entity/Vehicle';

let AppDataSource: DataSource;
let app: http.Server;

beforeAll(async () => {
  AppDataSource = getAppDataSource();
  app = getServer()
  // console.log("app", app);
});

// afterAll(async () => {
// });

describe('Repair API Routes', () => {
  test('GET /repair should return an empty array initially', async () => {
    const response = await request(app).get('/repair');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('POST /repair should create a new repair', async () => {
    const employeeResponse = await request(app)
      .post('/employee')
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        seniority: 3,
        is_mechanic: true,
        vehicle_certifications: ['Cars'],
      });

    const vehicleResponse = await request(app)
      .post('/vehicle')
      .send({
        brand: 'Toyota',
        load_kg: 1500,
        capacity_kg: 2000,
        year_manufactured: 2018,
        num_repairs: 1,
        type: VehicleType.cargo
      });

    const empId = employeeResponse.body.emp_id;
    const vehicleId = vehicleResponse.body.vehicle_id;
    console.log("empId", empId);
    console.log("vehicleId", vehicleId);

    const response = await request(app)
      .post('/repair')
      .send({
        emp_id: empId,
        vehicle_id: vehicleId,
        estimated_days: 3,
        actual_days: 2
      });

    expect(response.status).toBe(201);
    expect(response.body.estimated_days).toBe(3);
    expect(response.body.actual_days).toBe(2);
  });

  test('GET /repair should return the created repair', async () => {
    const response = await request(app).get('/repair');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  test('PUT /repair/:repairId should update a repair', async () => {
    const repairResponse = await request(app)
      .post('/repair')
      .send({
        emp_id: 1,
        vehicle_id: 1,
        estimated_days: 4,
        actual_days: 5
      });

    const repairId = repairResponse.body.repair_id;
    console.log("repairId", repairId);

    const updateResponse = await request(app)
      .put(`/repair/${repairId}`)
      .send({
        estimated_days: 5,
        actual_days: 4
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.actual_days).toBe(4);
  });

  test('DELETE /repair/:repairId should delete a repair', async () => {
    const repairResponse = await request(app)
      .post('/repair')
      .send({
        emp_id: 1,
        vehicle_id: 1,
        estimated_days: 3,
        actual_days: 3
      });

    const repairId = repairResponse.body.repair_id;

    const deleteResponse = await request(app).delete(`/repair/${repairId}`);
    expect(deleteResponse.status).toBe(200);

    const fetchResponse = await request(app).get(`/repair/${repairId}`);
    expect(fetchResponse.status).toBe(404);
  });
});