import { container } from 'tsyringe';

import HandlebarsTemplateProvider from './implementation/HandlebarsTemplateProvider';
import TemplateMailProviderInterface from './interfaces/TemplateMailProviderINterface';

container.registerSingleton<TemplateMailProviderInterface>(
  'TemplateMailProvider',
  HandlebarsTemplateProvider,
);
