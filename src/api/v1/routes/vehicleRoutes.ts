import { Router } from 'express';
import * as vehicleController from '../controllers/vehicleController';

const router = Router();

// GET /api/v1/vehicles
router.get('/vehicles', vehicleController.getAllVehicles);

// GET /api/v1/vehicles/:id
router.get('/vehicles/:id', vehicleController.getVehicleById);

// POST /api/v1/vehicles
router.post('/vehicles', vehicleController.createVehicle);

// PUT /api/v1/vehicles/:id
router.put('/vehicles/:id', vehicleController.updateVehicle);

// DELETE /api/v1/vehicles/:id
router.delete('/vehicles/:id', vehicleController.deleteVehicle);

export default router;
