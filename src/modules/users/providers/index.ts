import { container } from 'tsyringe';
import HashProviderInterface from './interfaces/HashProviderImplementation';
import BCryptHashProvider from './implementations/BCryptHashProvider';

container.registerSingleton<HashProviderInterface>(
  'HashProvider',
  BCryptHashProvider,
);
