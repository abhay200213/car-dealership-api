import { Router } from 'express';
import * as saleController from '../controllers/saleController';
import { authenticate } from '../../../middleware/auth';
import { authorize } from '../../../middleware/authorize';

const router = Router();

// GET all sales — GET /api/v1/sales
router.get(
  '/',
  authenticate,
  authorize(['admin', 'manager']),
  saleController.getAllSales
);

// GET one sale — GET /api/v1/sales/:id
router.get(
  '/:id',
  authenticate,
  authorize(['admin', 'manager']),
  saleController.getSaleById
);

// CREATE sale — POST /api/v1/sales
router.post(
  '/',
  authenticate,
  authorize(['admin', 'manager']),
  saleController.createSale
);

// UPDATE sale — PUT /api/v1/sales/:id
router.put(
  '/:id',
  authenticate,
  authorize(['admin', 'manager']),
  saleController.updateSale
);

// DELETE sale — DELETE /api/v1/sales/:id
router.delete(
  '/:id',
  authenticate,
  authorize(['admin']),
  saleController.deleteSale
);

export default router;
