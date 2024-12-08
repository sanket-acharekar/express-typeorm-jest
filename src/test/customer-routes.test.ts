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

describe('Customer API Routes', () => {
  test('GET /customer should return an empty array initially', async () => {
    const response = await request(app).get('/customer');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('POST /customer should create a new customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'John Doe',
        address: '123 Main St',
        phone1: '1234567890',
        phone2: '0987654321',
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('John Doe');
    expect(response.body.address).toBe('123 Main St');
  });

  test('GET /customer should return the created customer', async () => {
    const response = await request(app).get('/customer');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe('John Doe');
  });

  test('PUT /customer/:customerId should update a customer', async () => {
    const customerResponse = await request(app)
      .post('/customer')
      .send({
        name: 'Jane Doe',
        address: '456 Elm St',
        phone1: '1111111111',
        phone2: '2222222222',
      });

    const customerId = customerResponse.body.customer_id;
    const updateResponse = await request(app)
      .put(`/customer/${customerId}`)
      .send({
        name: 'Jane Smith',
        address: '789 Oak St',
        phone1: '3333333333',
        phone2: '4444444444',
      });
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.name).toBe('Jane Smith');
  });

  test('DELETE /customer/:customerId should delete a customer', async () => {
    const customerResponse = await request(app)
      .post('/customer')
      .send({
        name: 'Mark Brown',
        address: '890 Pine St',
        phone1: '5555555555',
        phone2: '6666666666',
      });

    const customerId = customerResponse.body.customer_id;

    const deleteResponse = await request(app).delete(`/customer/${customerId}`);
    expect(deleteResponse.status).toBe(200);

    const fetchResponse = await request(app).get(`/customer/${customerId}`);
    expect(fetchResponse.status).toBe(404);
  });
});