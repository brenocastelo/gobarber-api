import Redis, { Redis as RedisClient } from 'ioredis';

import cacheConfig from '@config/cache';
import CacheProviderInterface from '../interfaces/CacheProviderInterface';

export default class RedisCacheProvider implements CacheProviderInterface {
  private client: RedisClient;

  public constructor() {
    this.client = new Redis(cacheConfig.configs.redis);
  }

  public async save(key: string, value: unknown): Promise<void> {
    this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const cachedValue = await this.client.get(key);
    if (!cachedValue) return null;

    const parsedValue = JSON.parse(cachedValue) as T;

    return parsedValue;
  }

  public async invalidate(key: string): Promise<void> {
    console.log(key);
  }
}
