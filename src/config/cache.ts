import { RedisOptions } from 'ioredis';

interface CacheConfig {
  driver: string;
  configs: {
    redis: RedisOptions;
  };
}

export default {
  driver: 'redis',

  configs: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
    },
  },
} as CacheConfig;
