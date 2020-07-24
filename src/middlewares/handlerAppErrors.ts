import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';

export default (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'Error', message: err.message });
  }

  return response
    .status(500)
    .json({ status: 'Error', message: 'Internal server error' });
};
