
import { Request, Response } from 'express';
import { Employee } from '../entity/Employee';
import { AppDataSource } from '../ormconfig';


// Get Employees
export async function getEmployee (req: Request, res: Response): Promise<void> {
    const employeeRepository = AppDataSource.getRepository(Employee);
    const { emp_id } = req.params;
    try {
      if (emp_id) {
        const id = parseInt(emp_id, 10); // Convert string to number
        if (isNaN(id)) {
          res.status(400).json({ message: 'Invalid employee ID' });
          return;
        }
  
        const employee = await employeeRepository.findOne({
          where: { emp_id: id },
        });
        if (!employee) {
          res.status(404).json({ message: 'Employee not found' });
          return;
        }
  
        res.json(employee);
      } else {
        const employees = await employeeRepository.find();
        res.json(employees);
      }
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: 'Error fetching employees', error });
    }
};

// Create a Employee
export async function createEmployee(req: Request, res: Response): Promise<void> {
    const employeeRepository = AppDataSource.getRepository(Employee);
    const { firstName, lastName, seniority, is_mechanic, vehicle_certifications } = req.body;
    console.log({ firstName, lastName, seniority, is_mechanic, vehicle_certifications })
    try {
      const newEmployee = employeeRepository.create({
        firstName,
        lastName,
        seniority,
        is_mechanic,
        vehicle_certifications,
      });
      await employeeRepository.save(newEmployee);
      console.log("newEmployee", newEmployee)
      res.status(201).json(newEmployee);
    } catch (error) {
      res.status(500).json({ message: 'Error creating employee', error });
    }
};

// Update a Employee
export async function updateEmployee(req: Request, res: Response): Promise<void> {
    const employeeRepository = AppDataSource.getRepository(Employee);
    const { emp_id } = req.params;
    const { firstName, lastName, seniority, is_mechanic, vehicle_certifications } = req.body;
  
    try {
      const id = parseInt(emp_id, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid employee ID' });
        return;
      }
  
      const employee = await employeeRepository.findOneBy({ emp_id: id });
      if (!employee) {
        res.status(404).json({ message: 'Employee not found' });
        return;
      }
  
      employee.firstName = firstName;
      employee.lastName = lastName;
      employee.seniority = seniority;
      employee.is_mechanic = is_mechanic;
      employee.vehicle_certifications = vehicle_certifications;
  
      await employeeRepository.save(employee);
      res.json(employee);
    } catch (error) {
      res.status(500).json({ message: 'Error updating employee', error });
    }
};

// Delete a Employee
export async function deleteEmployee(req: Request, res: Response): Promise<void> {
    const employeeRepository = AppDataSource.getRepository(Employee);
    const { emp_id } = req.params;
  
    try {
      const id = parseInt(emp_id, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid employee ID' });
        return;
      }
  
      const employee = await employeeRepository.findOneBy({ emp_id: id });
      if (!employee) {
        res.status(404).json({ message: 'Employee not found' });
        return;
      }
  
      await employeeRepository.remove(employee);
      res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting employee', error });
    }
};