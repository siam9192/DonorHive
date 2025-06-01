import { NextFunction } from 'express';
import { AnyZodObject, ZodEffects } from 'zod';

const validateRequest = (zodSchema:ZodEffects<any>): any => {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    try {
      zodSchema.parse(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;
