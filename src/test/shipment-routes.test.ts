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

describe('Shipment API Routes', () => {
  test('GET /shipment should return an empty array initially', async () => {
    const response = await request(app).get('/shipment');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('POST /shipment should create a new shipment', async () => {
    const customerResponse = await request(app)
      .post('/customer')
      .send({
        name: 'ACME Corp',
        address: '123 Main St',
        phone1: '1234567890',
        phone2: '0987654321',
      });

    const customerId = customerResponse.body.customer_id;

    const response = await request(app)
      .post('/shipment')
      .send({
        weight_kg: 150,
        value_usd: 1000,
        capacity_kg: 200,
        // origin: 'New York',
        // destination: 'Los Angeles',
        customer: customerId,
      });

    expect(response.status).toBe(201);
    // expect(response.body.origin).toBe('New York');
    // expect(response.body.destination).toBe('Los Angeles');
  });

  test('GET /shipment should return the created shipment', async () => {
    const response = await request(app).get('/shipment');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  test('PUT /shipment/:shipmentId should update a shipment', async () => {
    const shipmentResponse = await request(app)
      .post('/shipment')
      .send({
        weight_kg: 200,
        value_usd: 1200,
        capacity_kg: 300,
        // origin: 'San Francisco',
        // destination: 'Seattle',
        customer: 1,
      });

    const shipmentId = shipmentResponse.body.shipment_id;

    const updateResponse = await request(app)
      .put(`/shipment/${shipmentId}`)
      .send({
        weight_kg: 180,
        destination: 'Portland',
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.weight_kg).toBe(180);
    // expect(updateResponse.body.destination).toBe('Portland');
  });

  test('DELETE /shipment/:shipmentId should delete a shipment', async () => {
    const shipmentResponse = await request(app)
      .post('/shipment')
      .send({
        weight_kg: 100,
        value_usd: 800,
        capacity_kg: 150,
        // origin: 'Boston',
        // destination: 'Chicago',
        customer: 1,
      });

    const shipmentId = shipmentResponse.body.shipment_id;

    const deleteResponse = await request(app).delete(`/shipment/${shipmentId}`);
    expect(deleteResponse.status).toBe(200);

    const fetchResponse = await request(app).get(`/shipment/${shipmentId}`);
    expect(fetchResponse.status).toBe(404);
  });
});