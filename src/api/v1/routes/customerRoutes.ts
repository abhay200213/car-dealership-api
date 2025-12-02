import { Router } from 'express';
import * as customerController from '../controllers/customerController';
import { authenticate } from '../../../middleware/auth';
import { authorize } from '../../../middleware/authorize';

const router = Router();

// GET all customers — GET /api/v1/customers
router.get(
  '/',
  authenticate,
  authorize(['admin', 'manager']),
  customerController.getAllCustomers
);

// GET one customer — GET /api/v1/customers/:id
router.get(
  '/:id',
  authenticate,
  authorize(['admin', 'manager']),
  customerController.getCustomerById
);

// CREATE customer — POST /api/v1/customers
router.post(
  '/',
  authenticate,
  authorize(['admin', 'manager']),
  customerController.createCustomer
);

// UPDATE customer — PUT /api/v1/customers/:id
router.put(
  '/:id',
  authenticate,
  authorize(['admin', 'manager']),
  customerController.updateCustomer
);

// DELETE customer — DELETE /api/v1/customers/:id
router.delete(
  '/:id',
  authenticate,
  authorize(['admin']),
  customerController.deleteCustomer
);

export default router;
