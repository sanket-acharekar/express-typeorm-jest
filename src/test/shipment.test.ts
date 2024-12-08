import { DataSource } from 'typeorm';
import { getServer, getAppDataSource } from './helpers/setup';
import { Shipment } from '../entity/Shipment';
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

describe('Shipment Entity Tests', () => {
  test('should create and retrieve a shipment', async () => {
    const shipmentRepository = AppDataSource.getRepository(Shipment);
    const customerRepository = AppDataSource.getRepository(Customer);

    const customer = await customerRepository.save({
      name: 'Jane Doe',
      address: '123 Main St',
      phone1: '1234567890',
      phone2: '0987654321',
    });

    const newShipment = shipmentRepository.create({
      weight_kg: 1500,
      value_usd: 10000,
      // capacity_kg: 2000,
      // origin: 'New York',
      // destination: 'Los Angeles',
      customer,
    });

    await shipmentRepository.save(newShipment);

    const savedShipment = await shipmentRepository.findOne({
      where: { shipment_id: newShipment.shipment_id },
      relations: ['customer'],
    });

    expect(savedShipment).not.toBeNull();
    expect(savedShipment?.weight_kg).toBe(1500);
    expect(savedShipment?.value_usd).toBe(10000);
    expect(savedShipment?.customer.customer_id).toBe(customer.customer_id);
  });
});