import { Router } from 'express';
import * as vehicleController from '../controllers/vehicleController';
import { authenticate } from '../../../middleware/auth';
import { authorize } from '../../../middleware/authorize';

const router = Router();

// SEARCH — GET /api/v1/vehicles/search
router.get(
  '/search',
  authenticate,
  authorize(['admin', 'manager', 'user']),
  vehicleController.searchVehicles
);

// GET all — GET /api/v1/vehicles
router.get(
  '/',
  authenticate,
  authorize(['admin', 'manager', 'user']),
  vehicleController.getAllVehicles
);

// GET one — GET /api/v1/vehicles/:id
router.get(
  '/:id',
  authenticate,
  authorize(['admin', 'manager', 'user']),
  vehicleController.getVehicleById
);

// CREATE — POST /api/v1/vehicles
router.post(
  '/',
  authenticate,
  authorize(['admin', 'manager']),
  vehicleController.createVehicle
);

// UPDATE — PUT /api/v1/vehicles/:id
router.put(
  '/:id',
  authenticate,
  authorize(['admin', 'manager']),
  vehicleController.updateVehicle
);

// DELETE — DELETE /api/v1/vehicles/:id
router.delete(
  '/:id',
  authenticate,
  authorize(['admin', 'manager']),
  vehicleController.deleteVehicle
);

export default router;
