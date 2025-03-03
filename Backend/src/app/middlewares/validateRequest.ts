import { NextFunction } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (zodSchema: AnyZodObject): any => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      zodSchema.parse(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;
