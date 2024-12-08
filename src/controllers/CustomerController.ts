
import { Request, Response } from 'express';
import { Customer } from '../entity/Customer';
import { AppDataSource } from '../ormconfig';


// Get Customers
export async function getCustomers (req: Request, res: Response): Promise<void> {

  const customerRepository = AppDataSource.getRepository(Customer);
  const { customerId } = req.params;

  try {
    if (customerId) {
      const id = parseInt(customerId, 10); // Convert string to number
      if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid customer ID' });
        return;
      }

      const customer = await customerRepository.findOne({
        where: { customer_id: id },
        relations: ['shipments'], // Include related shipments
      });
      if (!customer) {
        res.status(404).json({ message: 'Customer not found' });
        return;
      }

      res.json(customer);
    } else {
      const customers = await customerRepository.find({ relations: ['shipments'] });
      res.json(customers);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customers', error });
  }
};

// Create a Customer
export async function createCustomers (req: Request, res: Response): Promise<void> {
    const customerRepository = AppDataSource.getRepository(Customer);
    const { name, address, phone1, phone2 } = req.body;
  
    try {
      const newCustomer = customerRepository.create({ name, address, phone1, phone2 });
      await customerRepository.save(newCustomer);
      res.status(201).json(newCustomer);
    } catch (error) {
      res.status(500).json({ message: 'Error creating customer', error });
    }
};

// Update a Customer
export async function updateCustomers(req: Request, res: Response): Promise<void> {
    const customerRepository = AppDataSource.getRepository(Customer);
    const { customerId } = req.params;
    const { name, address, phone1, phone2 } = req.body;
  
    try {
      const id = parseInt(customerId, 10); // Convert string to number
      if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid customer ID' });
        return;
      }
  
      const customer = await customerRepository.findOneBy({ customer_id: id });
      if (!customer) {
        res.status(404).json({ message: 'Customer not found' });
        return;
      }
  
      customer.name = name;
      customer.address = address;
      customer.phone1 = phone1;
      customer.phone2 = phone2;
  
      await customerRepository.save(customer);
      res.json(customer);
    } catch (error) {
      console.log("error updating customer", error)
      res.status(500).json({ message: 'Error updating customer', error });
    }
};

// Delete a Customer
export async function deleteCustomers(req: Request, res: Response): Promise<void> {
    const customerRepository = AppDataSource.getRepository(Customer);
    const { customerId } = req.params;
  
    try {
      const id = parseInt(customerId, 10); // Convert string to number
      if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid customer ID' });
        return;
      }
  
      const customer = await customerRepository.findOneBy({ customer_id: id });
      if (!customer) {
        res.status(404).json({ message: 'Customer not found' });
        return;
      }
  
      await customerRepository.remove(customer);
      res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting customer', error });
    }
};