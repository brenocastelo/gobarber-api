import CacheProviderInterface from '../interfaces/CacheProviderInterface';

export default class FakeCacheProvider implements CacheProviderInterface {
  private cacheData: Record<string, string> = {};

  public async save(key: string, value: unknown): Promise<void> {
    this.cacheData[key] = JSON.stringify(value);
  }

  public async recover<T>(key: string): Promise<T | null> {
    const cachedValue = this.cacheData[key];

    if (!cachedValue) return null;

    const parsedCache = JSON.parse(cachedValue);

    return parsedCache as T;
  }

  public async invalidate(key: string): Promise<void> {
    delete this.cacheData[key];
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const cachedKeys = Object.keys(this.cacheData).filter(key =>
      key.startsWith(`${prefix}:`),
    );

    cachedKeys.forEach(key => delete this.cacheData[key]);
  }
}
