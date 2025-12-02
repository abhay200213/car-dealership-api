import { Router } from 'express';
import * as vehicleController from '../controllers/vehicleController';
import { authenticate } from '../../../middleware/auth';
import { authorize } from '../../../middleware/authorize';

const router = Router();

// SEARCH — GET /api/v1/vehicles/search
router.get(
  '/vehicles/search',
  authenticate,
  authorize(['admin', 'manager', 'user']),
  vehicleController.searchVehicles
);

// GET all — GET /api/v1/vehicles
router.get(
  '/vehicles',
  authenticate,
  authorize(['admin', 'manager', 'user']),
  vehicleController.getAllVehicles
);

// GET one — GET /api/v1/vehicles/:id
router.get(
  '/vehicles/:id',
  authenticate,
  authorize(['admin', 'manager', 'user']),
  vehicleController.getVehicleById   // FIXED NAME
);

// CREATE — POST /api/v1/vehicles
router.post(
  '/vehicles',
  authenticate,
  authorize(['admin', 'manager']),
  vehicleController.createVehicle
);

// UPDATE — PUT /api/v1/vehicles/:id
router.put(
  '/vehicles/:id',
  authenticate,
  authorize(['admin', 'manager']),
  vehicleController.updateVehicle
);

// DELETE — DELETE /api/v1/vehicles/:id
router.delete(
  '/vehicles/:id',
  authenticate,
  authorize(['admin', 'manager']),
  vehicleController.deleteVehicle
);

export default router;
