import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const appointmentSchema = Joi.object({
  customerId: Joi.number().integer().positive().required(),
  vehicleId: Joi.number().integer().positive().optional(),
  scheduledAt: Joi.string().isoDate().required(),
  status: Joi.string()
    .valid('scheduled', 'completed', 'cancelled', 'no_show')
    .optional(),
  notes: Joi.string().max(1000).optional()
});

export const validateAppointment = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error, value } = appointmentSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const details = error.details.map((d) => d.message);
    res.status(400).json({
      error: 'Validation failed',
      details
    });
    return;
  }

  // Replace body with sanitized data
  req.body = value;
  next();
};
