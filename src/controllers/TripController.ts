
import { Request, Response } from 'express';
import { Trip } from '../entity/Trip';
import { AppDataSource } from '../ormconfig';
import { TripDriver } from '../entity/TripDriver';
import { TripVehicle } from '../entity/TripVehicle';
import { TripShipment } from '../entity/TripShipment';


// Get all Trips
export async function getTrips (req: Request, res: Response): Promise<void> {
    const tripRepository = AppDataSource.getRepository(Trip);
    const { trip_id } = req.params;
  
    try {
      if (trip_id) {
        const id = parseInt(trip_id, 10);
        if (isNaN(id)) {
          res.status(400).json({ message: 'Invalid trip ID' });
          return;
        }
  
        const trip = await tripRepository.findOne({
          where: { trip_id: id },
          relations: ['tripVehicles', 'tripDrivers', 'tripShipments'], // Include related entities
        });
        if (!trip) {
          res.status(404).json({ message: 'Trip not found' });
          return;
        }
  
        res.json(trip);
      } else {
        const trips = await tripRepository.find({
          relations: ['tripVehicles', 'tripDrivers', 'tripShipments'],
        });
        res.json(trips);
      }
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: 'Error fetching trips', error });
    }
};

// Create a Trip
export async function createTrip(req: Request, res: Response): Promise<void> {
    const tripRepository = AppDataSource.getRepository(Trip);
    const tripDriverRepository = AppDataSource.getRepository(TripDriver);
    const tripVehicleRepository = AppDataSource.getRepository(TripVehicle);
    const tripShipmentRepository = AppDataSource.getRepository(TripShipment);
    const { from_location, to_location, vehicle_id, driver_id, tripShipmentIds } = req.body;
  
    try {
      // create a trip using from and to 
      let newTrip = tripRepository.create({
        from_location,
        to_location,
      });
      await tripRepository.save(newTrip);

      if(!!driver_id) {
        // now save the driver to newly created trip
        const newTripDriver = tripDriverRepository.create({
          trip_id: newTrip.trip_id,
          driver_id: driver_id,
        });
        await tripDriverRepository.save(newTripDriver);
      }

      if(!!vehicle_id) {
        // assign the vehicle to newly created trip
        const newTripVehicle = tripVehicleRepository.create({
          trip_id: newTrip.trip_id,
          vehicle_id: vehicle_id,
        });
        await tripVehicleRepository.save(newTripVehicle);
      }
      console.log("tripShipmentIds", tripShipmentIds);
      console.log("Array.isArray(tripShipmentIds)", Array.isArray(tripShipmentIds))
      if(!!tripShipmentIds && Array.isArray(tripShipmentIds)) {
        console.log("tripShipmentIds", tripShipmentIds)
        for (let tripShipmentId of tripShipmentIds) {
          console.log("tripShipmentId", tripShipmentId)
          const newTripShipment = tripShipmentRepository.create({
            trip_id: newTrip.trip_id,
            shipment_id: parseInt(tripShipmentId),
          });
          await tripShipmentRepository.save(newTripShipment);
        }
      }

      const finalTrip = await tripRepository.findOne({
        where: { trip_id: newTrip.trip_id },
        relations: ['tripShipments'], // Include related repairs
      });
      res.status(201).json(finalTrip);
    } catch (error) {
      console.log("error creating trip", error);
      res.status(500).json({ message: 'Error creating trip', error });
    }
};

// Update a Trip
export async function updateTrip(req: Request, res: Response): Promise<void> {
    const tripRepository = AppDataSource.getRepository(Trip);
    const { trip_id } = req.params;
    const { from_location, to_location, vehicle, driver, tripShipments } = req.body;
  
    try {
      const id = parseInt(trip_id, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid trip ID' });
        return;
      }
  
      const trip = await tripRepository.findOneBy({ trip_id: id });
      if (!trip) {
        res.status(404).json({ message: 'Trip not found' });
        return;
      }
  
      trip.from_location = from_location;
      trip.to_location = to_location;
      trip.tripShipments = tripShipments;
  
      await tripRepository.save(trip);
      res.json(trip);
    } catch (error) {
      res.status(500).json({ message: 'Error updating trip', error });
    }
};

// Delete a Trip
export async function deleteTrip(req: Request, res: Response): Promise<void> {
    const tripRepository = AppDataSource.getRepository(Trip);
    const { trip_id } = req.params;
  
    try {
      const id = parseInt(trip_id, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid trip ID' });
        return;
      }
  
      const trip = await tripRepository.findOneBy({ trip_id: id });
      if (!trip) {
        res.status(404).json({ message: 'Trip not found' });
        return;
      }
  
      await tripRepository.remove(trip);
      res.json({ message: 'Trip deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting trip', error });
    }
};