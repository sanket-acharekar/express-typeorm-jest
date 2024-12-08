
import { Request, Response } from 'express';
import { Shipment } from '../entity/Shipment';
import { AppDataSource } from '../ormconfig';


// Get all Shipments
export async function getShipments (req: Request, res: Response): Promise<void> {
    const shipmentRepository = AppDataSource.getRepository(Shipment);
    const { shipment_id } = req.params;
  
    try {
      if (shipment_id) {
        const id = parseInt(shipment_id, 10);
        if (isNaN(id)) {
          res.status(400).json({ message: 'Invalid shipment ID' });
          return;
        }
  
        const shipment = await shipmentRepository.findOne({
          where: { shipment_id: id },
          relations: ['customer'], // Include related customer
        });
        if (!shipment) {
          res.status(404).json({ message: 'Shipment not found' });
          return;
        }
  
        res.json(shipment);
      } else {
        const shipments = await shipmentRepository.find({ relations: ['customer'] });
        res.json(shipments);
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching shipments', error });
    }
};

// Create a Shipment
export async function createShipment(req: Request, res: Response): Promise<void> {
    const shipmentRepository = AppDataSource.getRepository(Shipment);
    const { weight_kg, value_usd, capacity_kg, origin, destination, customer } = req.body;
  
    try {
      const newShipment = shipmentRepository.create({
        weight_kg,
        value_usd,
        // capacity_kg,
        // origin,
        // destination,
        customer,
      });
      await shipmentRepository.save(newShipment);
      res.status(201).json(newShipment);
    } catch (error) {
      res.status(500).json({ message: 'Error creating shipment', error });
    }
};

// Update a Shipment
export async function updateShipment(req: Request, res: Response): Promise<void> {
    const shipmentRepository = AppDataSource.getRepository(Shipment);
    const { shipment_id } = req.params;
    const { weight_kg, value_usd, capacity_kg, origin, destination, customer } = req.body;
  
    try {
      const id = parseInt(shipment_id, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid shipment ID' });
        return;
      }
  
      const shipment = await shipmentRepository.findOneBy({ shipment_id: id });
      if (!shipment) {
        res.status(404).json({ message: 'Shipment not found' });
        return;
      }
  
      shipment.weight_kg = weight_kg;
      shipment.value_usd = value_usd;
      // shipment.capacity_kg = capacity_kg;
      // shipment.origin = origin;
      // shipment.destination = destination;
      shipment.customer = customer;
  
      await shipmentRepository.save(shipment);
      res.json(shipment);
    } catch (error) {
      res.status(500).json({ message: 'Error updating shipment', error });
    }
};

// Delete a Shipment
export async function deleteShipment(req: Request, res: Response): Promise<void> {
    const shipmentRepository = AppDataSource.getRepository(Shipment);
    const { shipment_id } = req.params;
  
    try {
      const id = parseInt(shipment_id, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid shipment ID' });
        return;
      }
  
      const shipment = await shipmentRepository.findOneBy({ shipment_id: id });
      if (!shipment) {
        res.status(404).json({ message: 'Shipment not found' });
        return;
      }
  
      await shipmentRepository.remove(shipment);
      res.json({ message: 'Shipment deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting shipment', error });
    }
};