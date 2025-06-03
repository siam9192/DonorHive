import { NextFunction } from 'express';
import { AnyZodObject, ZodEffects, ZodObject } from 'zod';

const validateRequest = (zodSchema: ZodEffects<any> | ZodObject<any>): any => {
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
