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
      host: 'localhost',
      port: 6379,
      password: undefined,
    },
  },
} as CacheConfig;
