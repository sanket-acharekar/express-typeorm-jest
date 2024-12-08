import 'reflect-metadata';
import express from 'express';

import { createVehicle, deleteVehicle, getVehicles, updateVehicle } from './controllers/VehicleController';
import { getCustomers, createCustomers, updateCustomers, deleteCustomers } from './controllers/CustomerController';
import { getEmployee, createEmployee, updateEmployee, deleteEmployee } from './controllers/EmployeeController';
import { getRepair, createRepair, updateRepair, deleteRepair } from './controllers/RepairController';
import { getShipments, createShipment, updateShipment, deleteShipment } from './controllers/ShipmentController';
import { getTrips, createTrip, updateTrip, deleteTrip } from './controllers/TripController';

const app = express();
export default app;
const port = 3000;

app.use(express.json());

app.get('/vehicle/:vehicleId?', getVehicles);
app.post('/vehicle', createVehicle);
app.put('/vehicle/:vehicleId', updateVehicle);
app.delete('/vehicle/:vehicleId', deleteVehicle);

app.get('/customer/:customerId?', getCustomers);
app.post('/customer', createCustomers);
app.put('/customer/:customerId', updateCustomers);
app.delete('/customer/:customerId', deleteCustomers);

app.get('/employee/:emp_id?', getEmployee);
app.post('/employee', createEmployee);
app.put('/employee/:emp_id', updateEmployee);
app.delete('/employee/:emp_id', deleteEmployee);

app.get('/repair/:repair_id?', getRepair);
app.post('/repair', createRepair);
app.put('/repair/:repair_id', updateRepair);
app.delete('/repair/:repair_id', deleteRepair);

app.get('/shipment/:shipment_id?', getShipments);
app.post('/shipment', createShipment);
app.put('/shipment/:shipment_id', updateShipment);
app.delete('/shipment/:shipment_id', deleteShipment);

app.get('/trip/:trip_id?', getTrips);
app.post('/trip', createTrip);
app.put('/trip/:trip_id', updateTrip);
app.delete('/trip/:trip_id', deleteTrip);