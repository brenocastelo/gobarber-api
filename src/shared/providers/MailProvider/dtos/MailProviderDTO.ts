import TemplateMailProviderDTO from '@shared/providers/TemplateMailProvider/dtos/TemplateMailProviderDTO';

interface Contact {
  name: string;
  email: string;
}

export default interface MailProviderDTO {
  to: Contact;
  from?: Contact;
  subject: string;
  templateContent: TemplateMailProviderDTO;
}
