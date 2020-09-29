import TemplateMailProviderDTO from '../dtos/TemplateMailProviderDTO';
import TemplateMailProviderInterface from '../interfaces/TemplateMailProviderINterface';

export default class FakeTemplateMailProvider
  implements TemplateMailProviderInterface {
  public async parse({ file }: TemplateMailProviderDTO): Promise<string> {
    return file;
  }
}
