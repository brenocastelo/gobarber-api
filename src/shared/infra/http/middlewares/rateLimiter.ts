import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';

const redisClient = new Redis({
  host: 'localhost',
  port: 6379,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'limiter',
  points: 5,
  duration: 5,
});

export default async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await limiter.consume(request.ip);

    return next();
  } catch (error) {
    throw new AppError('Too many requests.', 429);
  }
};
