import { DataSource } from 'typeorm';
import { getServer, getAppDataSource } from './helpers/setup';
import { Vehicle, VehicleType } from '../entity/Vehicle';

let AppDataSource: DataSource;

beforeAll(async () => {
  AppDataSource = getAppDataSource();
});

// afterAll(async () => {
//   if (AppDataSource) {
//     await AppDataSource.destroy();
//   }
// });

describe('Vehicle Entity Tests', () => {
  test('should create and retrieve a vehicle', async () => {
    const vehicleRepository = AppDataSource.getRepository(Vehicle);

    const newVehicle = vehicleRepository.create({
      brand: 'Tesla',
      load_kg: 1500,
      capacity_kg: 2000,
      year_manufactured: 2022,
      num_repairs: 0,
      type: VehicleType.longHaul
    });

    await vehicleRepository.save(newVehicle);

    const savedVehicle = await vehicleRepository.findOneBy({
      vehicle_id: newVehicle.vehicle_id,
    });

    expect(savedVehicle).not.toBeNull();
    expect(savedVehicle?.brand).toBe('Tesla');
    expect(savedVehicle?.load_kg).toBe(1500);
    expect(savedVehicle?.capacity_kg).toBe(2000);
    expect(savedVehicle?.year_manufactured).toBe(2022);
    expect(savedVehicle?.num_repairs).toBe(0);
    expect(savedVehicle?.type).toBe(VehicleType.longHaul);
  });

  test('should update a vehicle', async () => {
    const vehicleRepository = AppDataSource.getRepository(Vehicle);

    const newVehicle = vehicleRepository.create({
      brand: 'Ford',
      load_kg: 1800,
      capacity_kg: 2500,
      year_manufactured: 2020,
      num_repairs: 1,
      type: VehicleType.inCity
    });

    await vehicleRepository.save(newVehicle);

    newVehicle.num_repairs = 2;
    await vehicleRepository.save(newVehicle);

    const updatedVehicle = await vehicleRepository.findOneBy({
      vehicle_id: newVehicle.vehicle_id,
    });

    expect(updatedVehicle?.num_repairs).toBe(2);
  });

  test('should delete a vehicle', async () => {
    const vehicleRepository = AppDataSource.getRepository(Vehicle);

    const newVehicle = vehicleRepository.create({
      brand: 'Chevrolet',
      load_kg: 2000,
      capacity_kg: 3000,
      year_manufactured: 2019,
      num_repairs: 3,
      type: VehicleType.longHaul
    });

    await vehicleRepository.save(newVehicle);

    await vehicleRepository.delete(newVehicle.vehicle_id);

    const deletedVehicle = await vehicleRepository.findOneBy({
      vehicle_id: newVehicle.vehicle_id,
    });

    expect(deletedVehicle).toBeNull();
  });
});