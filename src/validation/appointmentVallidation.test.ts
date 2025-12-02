import { Request, Response, NextFunction } from 'express';
import { validateAppointment } from './appointmentValidation';

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

const mockNext = () => jest.fn() as NextFunction;

describe('appointmentValidation middleware', () => {
  it('should call next() for valid payload', () => {
    const req = {
      body: {
        customerId: 1,
        vehicleId: 2,
        scheduledAt: new Date().toISOString(),
        status: 'scheduled',
        notes: 'Test appointment'
      }
    } as Request;

    const res = mockResponse();
    const next = mockNext();

    validateAppointment(req, res, next);

    expect(next).toHaveBeenCalled();
    expect((res.status as any)).not.toHaveBeenCalled();
  });

  it('should return 400 for invalid payload', () => {
    const req = {
      body: {
        // missing customerId, invalid scheduledAt
        scheduledAt: 'not-a-date'
      }
    } as Request;

    const res = mockResponse();
    const next = mockNext();

    validateAppointment(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
});
