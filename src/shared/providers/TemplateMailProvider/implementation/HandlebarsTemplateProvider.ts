import handlebars from 'handlebars';
import fs from 'fs';

import TemplateMailProviderDTO from '../dtos/TemplateMailProviderDTO';
import TemplateMailProviderInterface from '../interfaces/TemplateMailProviderINterface';

export default class HandlebarsTemplateProvider
  implements TemplateMailProviderInterface {
  public async parse({
    file,
    variables,
  }: TemplateMailProviderDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
