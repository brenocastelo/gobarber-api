import TemplateMailProviderDTO from '../dtos/TemplateMailProviderDTO';

export default interface TemplateMailProviderInterface {
  parse(data: TemplateMailProviderDTO): Promise<string>;
}
