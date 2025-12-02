// src/middleware/authorize.ts
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth';

export const authorize = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role as string | undefined;

    // Only allow known roles
    const allowedRoles = ['admin', 'manager', 'user'];

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Forbidden - invalid role' });
    }

    // Require one of the specified roles
    if (!roles.includes(userRole)) {
      return res.status(403).json({ error: 'Forbidden - insufficient permissions' });
    }

    next();
  };
};
