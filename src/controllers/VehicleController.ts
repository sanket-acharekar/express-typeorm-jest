
import { Request, Response } from 'express';
import { Vehicle } from '../entity/Vehicle';
import { AppDataSource } from '../ormconfig';


// Get all Vehicles
export async function getVehicles (req: Request, res: Response): Promise<void> {
  const vehicleRepository = AppDataSource.getRepository(Vehicle);
  const { vehicleId } = req.params;

  try {
    if (vehicleId) {
      const id = parseInt(vehicleId, 10); // Convert string to number
      if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid vehicle ID' });
        return;
      }

      const vehicle = await vehicleRepository.findOneBy({ vehicle_id: id });
      if (!vehicle) {
        res.status(404).json({ message: 'Vehicle not found' });
        return;
      }

      res.json(vehicle);
    } else {
      const vehicles = await vehicleRepository.find();
      res.json(vehicles);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vehicles', error });
  }
};

// Create a Vehicle
export async function createVehicle(req: Request, res: Response): Promise<void> {
  const vehicleRepository = AppDataSource.getRepository(Vehicle);
  const { brand, load_kg, capacity_kg, year_manufactured, num_repairs, type } = req.body;

  try {
    const newVehicle = vehicleRepository.create({
      brand,
      load_kg,
      capacity_kg,
      year_manufactured,
      num_repairs,
      type,
    });
    await vehicleRepository.save(newVehicle);
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error creating vehicle', error });
  }
};

// Update a Vehicle
export async function updateVehicle(req: Request, res: Response): Promise<void> {
  const vehicleRepository = AppDataSource.getRepository(Vehicle);
  const { vehicleId } = req.params;
  const { brand, load_kg, capacity_kg, year_manufactured, num_repairs, type } = req.body;

  try {
    const vehicle = await vehicleRepository.findOneBy({ vehicle_id: parseInt(vehicleId, 10) });
    if (!vehicle) {
      res.status(404).json({ message: 'Vehicle not found' });
      return;
    }

    vehicle.brand = brand;
    vehicle.load_kg = load_kg;
    vehicle.capacity_kg = capacity_kg;
    vehicle.year_manufactured = year_manufactured;
    vehicle.num_repairs = num_repairs;
    vehicle.type = type;

    await vehicleRepository.save(vehicle);
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Error updating vehicle', error });
  }
};

// Delete a Vehicle
export async function deleteVehicle(req: Request, res: Response): Promise<void> {
  const vehicleRepository = AppDataSource.getRepository(Vehicle);
  const { vehicleId } = req.params;

  try {
    const vehicle = await vehicleRepository.findOneBy({ vehicle_id: parseInt(vehicleId, 10) });
    if (!vehicle) {
      res.status(404).json({ message: 'Vehicle not found' });
      return;
    }

    await vehicleRepository.remove(vehicle);
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting vehicle', error });
  }
};