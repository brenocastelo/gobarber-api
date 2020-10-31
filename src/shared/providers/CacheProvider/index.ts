import { container } from 'tsyringe';
import RedisCacheProvider from './implementations/RedisCacheProvider';
import CacheProviderInterface from './interfaces/CacheProviderInterface';

container.registerSingleton<CacheProviderInterface>(
  'CacheProvider',
  RedisCacheProvider,
);
