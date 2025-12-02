import { Request, Response, NextFunction } from 'express';
import * as saleService from '../services/saleService';

export const getAllSales = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sales = await saleService.getAllSales();
    res.json(sales);
  } catch (err) {
    next(err);
  }
};

export const getSaleById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'Invalid sale ID' });
    }

    const sale = await saleService.getSaleById(id);

    if (!sale) {
      return res.status(404).json({ error: 'Sale not found' });
    }

    res.json(sale);
  } catch (err) {
    next(err);
  }
};

export const createSale = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // TODO: plug in Joi validation later
    const sale = await saleService.createSale(req.body);
    res.status(201).json(sale);
  } catch (err) {
    next(err);
  }
};

export const updateSale = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'Invalid sale ID' });
    }

    const updated = await saleService.updateSale(id, req.body);

    if (!updated) {
      return res.status(404).json({ error: 'Sale not found' });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteSale = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: 'Invalid sale ID' });
    }

    const deleted = await saleService.deleteSale(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Sale not found' });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
