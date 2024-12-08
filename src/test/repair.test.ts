import { DataSource } from 'typeorm';
import { getServer, getAppDataSource } from './helpers/setup';
import { Repair } from '../entity/Repair';
import { Employee } from '../entity/Employee';
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

describe('Repair Entity Tests', () => {
  test('should create and retrieve a repair', async () => {
    const repairRepository = AppDataSource.getRepository(Repair);
    const employeeRepository = AppDataSource.getRepository(Employee);
    const vehicleRepository = AppDataSource.getRepository(Vehicle);

    const employee: Employee = await employeeRepository.save({ firstName: 'John', lastName: 'Doe', seniority: 5, is_mechanic: true, vehicle_certifications:[ 'All'] });
    const vehicle: Vehicle = await vehicleRepository.save({ brand: 'Toyota', load_kg: 1000, capacity_kg: 2000, year_manufactured: 2020, num_repairs: 0, type: VehicleType.inCity });

    const newRepair = repairRepository.create({
      emp_id: employee,
      vehicle_id: vehicle,
      estimated_days: 5,
      actual_days: 3
    });

    await repairRepository.save(newRepair);

    const savedRepair = await repairRepository.findOne({
      where: { repair_id: newRepair.repair_id },
      relations: ['emp_id', 'vehicle_id'],
    });

    expect(savedRepair).not.toBeNull();
    expect(savedRepair?.estimated_days).toBe(5);
    expect(savedRepair?.actual_days).toBe(3);
    expect(savedRepair?.emp_id.emp_id).toBe(employee.emp_id);
    expect(savedRepair?.vehicle_id.vehicle_id).toBe(vehicle.vehicle_id);
  });
});