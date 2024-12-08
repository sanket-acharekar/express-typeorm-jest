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

describe('Vehicle API Routes', () => {
  test('GET /vehicle should return an empty array initially', async () => {
    const response = await request(app).get('/vehicle');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('POST /vehicle should create a new vehicle', async () => {
    const response = await request(app).post('/vehicle').send({
      brand: 'Toyota',
      load_kg: 1800,
      capacity_kg: 2200,
      year_manufactured: 2021,
      num_repairs: 1,
      type: VehicleType.longHaul
    });

    expect(response.status).toBe(201);
    expect(response.body.brand).toBe('Toyota');
    expect(response.body.year_manufactured).toBe(2021);
  });

  test('GET /vehicle should return the created vehicle', async () => {
    const response = await request(app).get('/vehicle');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].brand).toBe('Toyota');
  });

  test('PUT /vehicle/:vehicle_id should update a vehicle', async () => {
    const vehicleResponse = await request(app).post('/vehicle').send({
      brand: 'Ford',
      load_kg: 2000,
      capacity_kg: 2500,
      year_manufactured: 2022,
      num_repairs: 2,
      type: VehicleType.inCity
    });

    console.log("vehicleResponse.body", vehicleResponse.body);
    console.log("vehicleResponse.error", vehicleResponse.error);
    const vehicleId = vehicleResponse.body.vehicle_id;
    console.log()
    const updateResponse = await request(app).put(`/vehicle/${vehicleId}`).send({
      brand: 'Ford',
      load_kg: 2100,
      capacity_kg: 2600,
      year_manufactured: 2023,
      num_repairs: 3,
      type: VehicleType.cargo
    });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.load_kg).toBe(2100);
    expect(updateResponse.body.num_repairs).toBe(3);
    expect(updateResponse.body.type).toBe(VehicleType.cargo);
  });

  test('DELETE /vehicle/:vehicleId should delete a vehicle', async () => {
    const vehicleResponse = await request(app).post('/vehicle').send({
      brand: 'BMW',
      load_kg: 2200,
      capacity_kg: 2800,
      year_manufactured: 2020,
      num_repairs: 0,
      type: VehicleType.longHaul
    });

    const vehicle_id = vehicleResponse.body.vehicle_id;

    const deleteResponse = await request(app).delete(`/vehicle/${vehicle_id}`);
    expect(deleteResponse.status).toBe(200);

    const fetchResponse = await request(app).get(`/vehicle/${vehicle_id}`);
    expect(fetchResponse.status).toBe(404);
  });
});