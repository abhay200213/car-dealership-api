import { Router } from 'express';
import * as saleController from '../controllers/saleController';

const router = Router();

// GET /api/v1/sales
router.get('/sales', saleController.getAllSales);

// GET /api/v1/sales/:id
router.get('/sales/:id', saleController.getSaleById);

// POST /api/v1/sales
router.post('/sales', saleController.createSale);

// PUT /api/v1/sales/:id
router.put('/sales/:id', saleController.updateSale);

// DELETE /api/v1/sales/:id
router.delete('/sales/:id', saleController.deleteSale);

export default router;
