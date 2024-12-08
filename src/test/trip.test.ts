import { DataSource } from 'typeorm';
import { getServer, getAppDataSource } from './helpers/setup';
import { Trip } from '../entity/Trip';

let AppDataSource: DataSource;

beforeAll(async () => {
  AppDataSource = getAppDataSource();
});

// afterAll(async () => {
//   if (AppDataSource) {
//     await AppDataSource.destroy();
//   }
// });

describe('Trip Entity Tests', () => {
  test('should create and retrieve a trip', async () => {
    const tripRepository = AppDataSource.getRepository(Trip);

    const newTrip = tripRepository.create({
      from_location: 'Chicago',
      to_location: 'Dallas',
    });

    await tripRepository.save(newTrip);

    const savedTrip = await tripRepository.findOneBy({
      trip_id: newTrip.trip_id,
    });

    expect(savedTrip).not.toBeNull();
    expect(savedTrip?.from_location).toBe('Chicago');
    expect(savedTrip?.to_location).toBe('Dallas');
  });
});