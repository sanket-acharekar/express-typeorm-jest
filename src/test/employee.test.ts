import { DataSource } from 'typeorm';
import { getServer, getAppDataSource } from './helpers/setup';
import { Employee } from '../entity/Employee';

let AppDataSource: DataSource;

beforeAll(async () => {
  AppDataSource = getAppDataSource();
});

// afterAll(async () => {
//   if (AppDataSource) {
//     await AppDataSource.destroy();
//   }
// });

describe('Employee Entity Tests', () => {
  test('should create and retrieve an employee', async () => {
    const employeeRepository = AppDataSource.getRepository(Employee);

    const newEmployee = employeeRepository.create({
      firstName: 'Bob',
      lastName: 'Smith',
      seniority: 5,
      is_mechanic: true,
      vehicle_certifications: ['Truck', 'Bus'],
    });

    await employeeRepository.save(newEmployee);

    const savedEmployee = await employeeRepository.findOneBy({
      emp_id: newEmployee.emp_id,
    });

    expect(savedEmployee).not.toBeNull();
    expect(savedEmployee?.firstName).toBe('Bob');
    expect(savedEmployee?.lastName).toBe('Smith');
    expect(savedEmployee?.seniority).toBe(5);
    expect(savedEmployee?.is_mechanic).toBe(true);
    expect(savedEmployee?.vehicle_certifications).not.toBe(null);
    if(!!savedEmployee?.vehicle_certifications) {
      expect(savedEmployee?.vehicle_certifications[0]).toBe('Truck');
      expect(savedEmployee?.vehicle_certifications[1]).toBe('Bus');
    }
  });

  test('should update an employee', async () => {
    const employeeRepository = AppDataSource.getRepository(Employee);

    const newEmployee = employeeRepository.create({
      firstName: 'Alice',
      lastName: 'Jones',
      seniority: 2,
      is_mechanic: false,
      vehicle_certifications: ['Car'],
    });

    await employeeRepository.save(newEmployee);

    newEmployee.seniority = 3;
    await employeeRepository.save(newEmployee);

    const updatedEmployee = await employeeRepository.findOneBy({
      emp_id: newEmployee.emp_id,
    });

    expect(updatedEmployee?.seniority).toBe(3);
  });

  test('should delete an employee', async () => {
    const employeeRepository = AppDataSource.getRepository(Employee);

    const newEmployee = employeeRepository.create({
      firstName: 'Tom',
      lastName: 'Hanks',
      seniority: 10,
      is_mechanic: true,
      vehicle_certifications: ['All'],
    });

    await employeeRepository.save(newEmployee);

    await employeeRepository.delete(newEmployee.emp_id);

    const deletedEmployee = await employeeRepository.findOneBy({
      emp_id: newEmployee.emp_id,
    });

    expect(deletedEmployee).toBeNull();
  });
});