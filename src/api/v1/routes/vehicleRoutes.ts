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

/**
 * @swagger
 * /api/v1/vehicles:
 *   get:
 *     summary: Get all vehicles
 *     tags: [Vehicles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: make
 *         schema:
 *           type: string
 *         description: Filter by make
 *       - in: query
 *         name: model
 *         schema:
 *           type: string
 *         description: Filter by model
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Vehicles retrieved successfully
 *       401:
 *         description: Unauthorized
 *       429:
 *         description: Too many requests
 */


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


