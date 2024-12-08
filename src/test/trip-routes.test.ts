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

describe('Trip API Routes', () => {
  test('GET /trip should return an empty array initially', async () => {
    const response = await request(app).get('/trip');
    console.log("response.error", response.error);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('POST /trip should create a new trip', async () => {
    const response = await request(app)
      .post('/trip')
      .send({
        from_location: 'Houston',
        to_location: 'Dallas',
      });

    expect(response.status).toBe(201);
    expect(response.body.from_location).toBe('Houston');
    expect(response.body.to_location).toBe('Dallas');
  });

  test('GET /trip should return the created trip', async () => {
    const response = await request(app).get('/trip');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  test('PUT /trip/:tripId should update a trip', async () => {
    const tripResponse = await request(app)
      .post('/trip')
      .send({
        from_location: 'San Diego',
        to_location: 'Phoenix',
      });

    const tripId = tripResponse.body.trip_id;

    const updateResponse = await request(app)
      .put(`/trip/${tripId}`)
      .send({
        to_location: 'Las Vegas',
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.to_location).toBe('Las Vegas');
  });

  test('DELETE /trip/:tripId should delete a trip', async () => {
    const tripResponse = await request(app)
      .post('/trip')
      .send({
        from_location: 'Austin',
        to_location: 'San Antonio',
      });

    const tripId = tripResponse.body.trip_id;

    const deleteResponse = await request(app).delete(`/trip/${tripId}`);
    expect(deleteResponse.status).toBe(200);

    const fetchResponse = await request(app).get(`/trip/${tripId}`);
    expect(fetchResponse.status).toBe(404);
  });
});