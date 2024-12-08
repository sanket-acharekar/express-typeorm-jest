import { DataSource } from 'typeorm';
import { getServer, getAppDataSource } from './helpers/setup';
import { Customer } from '../entity/Customer';

let AppDataSource: DataSource;

beforeAll(async () => {
  AppDataSource = getAppDataSource();
});

// afterAll(async () => {
//   if (AppDataSource) {
//     await AppDataSource.destroy();
//   }
// });

describe('Customer Entity Tests', () => {
  test('should create and retrieve a customer', async () => {
    const customerRepository = AppDataSource.getRepository(Customer);

    const newCustomer = customerRepository.create({
      name: 'John Doe',
      address: '123 Main St',
      phone1: '1234567890',
      phone2: '0987654321',
    });

    await customerRepository.save(newCustomer);

    const savedCustomer = await customerRepository.findOneBy({
      customer_id: newCustomer.customer_id,
    });

    expect(savedCustomer).not.toBeNull();
    expect(savedCustomer?.name).toBe('John Doe');
    expect(savedCustomer?.address).toBe('123 Main St');
    expect(savedCustomer?.phone1).toBe('1234567890');
    expect(savedCustomer?.phone2).toBe('0987654321');
  });

  test('should update a customer', async () => {
    const customerRepository = AppDataSource.getRepository(Customer);

    const newCustomer = customerRepository.create({
      name: 'Jane Doe',
      address: '456 Elm St',
      phone1: '1112223333',
      phone2: '4445556666',
    });

    await customerRepository.save(newCustomer);

    newCustomer.address = '789 Oak St';
    await customerRepository.save(newCustomer);

    const updatedCustomer = await customerRepository.findOneBy({
      customer_id: newCustomer.customer_id,
    });

    expect(updatedCustomer?.address).toBe('789 Oak St');
  });

  test('should delete a customer', async () => {
    const customerRepository = AppDataSource.getRepository(Customer);

    const newCustomer = customerRepository.create({
      name: 'Alice',
      address: '910 Pine St',
      phone1: '5555555555',
      phone2: '6666666666',
    });

    await customerRepository.save(newCustomer);

    await customerRepository.delete(newCustomer.customer_id);

    const deletedCustomer = await customerRepository.findOneBy({
      customer_id: newCustomer.customer_id,
    });

    expect(deletedCustomer).toBeNull();
  });
});