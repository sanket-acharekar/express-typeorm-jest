
import { Request, Response } from 'express';
import { Repair } from '../entity/Repair';
import { AppDataSource } from '../ormconfig';


// Get Repairs
export async function getRepair (req: Request, res: Response): Promise<void> {
  const repairRepository = AppDataSource.getRepository(Repair);
  const { repair_id } = req.params;

  try {
    if (repair_id) {
      const id = parseInt(repair_id, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid repair ID' });
        return;
      }

      const repair = await repairRepository.findOne({
        where: { repair_id: id },
        relations: ['emp_id', 'vehicle_id'], // Include related employee and vehicle
      });
      if (!repair) {
        res.status(404).json({ message: 'Repair not found' });
        return;
      }

      res.json(repair);
    } else {
      const repairs = await repairRepository.find({ relations: ['emp_id', 'vehicle_id'] });
      res.json(repairs);
    }
  } catch (error) {
    console.log("Error Fetching Repairs", error);
    res.status(500).json({ message: 'Error fetching repairs', error });
  }
};

// Create a Repair
export async function createRepair(req: Request, res: Response): Promise<void> {
    const repairRepository = AppDataSource.getRepository(Repair);
    const { emp_id, vehicle_id, estimated_days, actual_days} = req.body;

    try {
        const newRepair = repairRepository.create({
        emp_id,
        vehicle_id,
        estimated_days,
        actual_days
        });
        await repairRepository.save(newRepair);
        res.status(201).json(newRepair);
    } catch (error) {
      console.log("error adding repair", error)
        res.status(500).json({ message: 'Error creating repair', error });
    }
};

// Update a Repair
export async function updateRepair(req: Request, res: Response): Promise<void> {
    const repairRepository = AppDataSource.getRepository(Repair);
    const { repair_id } = req.params;
    const { emp_id, vehicle_id, estimated_days, actual_days} = req.body;

    try {
      console.log("repair_id in ()", repair_id);
        const id = parseInt(repair_id, 10);
        if (isNaN(id)) {
          res.status(400).json({ message: 'Invalid repair ID' });
          return;
        }

        const repair = await repairRepository.findOneBy({ repair_id: id });
        if (!repair) {
        res.status(404).json({ message: 'Repair not found' });
        return;
        }

        repair.emp_id = emp_id;
        repair.vehicle_id = vehicle_id;
        repair.estimated_days = estimated_days;
        repair.actual_days = actual_days

        await repairRepository.save(repair);
        res.json(repair);
    } catch (error) {
        res.status(500).json({ message: 'Error updating repair', error });
    }
};

// Delete a Repair
export async function deleteRepair(req: Request, res: Response): Promise<void> {
    const repairRepository = AppDataSource.getRepository(Repair);
    const { repair_id } = req.params;
  
    try {
      const id = parseInt(repair_id, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid repair ID' });
        return;
      }
  
      const repair = await repairRepository.findOneBy({ repair_id: id });
      if (!repair) {
        res.status(404).json({ message: 'Repair not found' });
        return;
      }
  
      await repairRepository.remove(repair);
      res.json({ message: 'Repair deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting repair', error });
    }
};