import { Router } from 'express';

import * as customerController from '../controllers/customerController';

const router = Router();

// GET /api/v1/customers
router.get('/customers', customerController.getAllCustomers);

// GET /api/v1/customers/:id
router.get('/customers/:id', customerController.getCustomerById);

// POST /api/v1/customers
router.post('/customers', customerController.createCustomer);

// PUT /api/v1/customers/:id
router.put('/customers/:id', customerController.updateCustomer);

// DELETE /api/v1/customers/:id
router.delete('/customers/:id', customerController.deleteCustomer);

export default router;
