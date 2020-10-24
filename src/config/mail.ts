interface MailDriver {
  driver: 'ses' | 'ethereal';
  defaults: {
    from: {
      name: string;
      email: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      name: 'Breno Castelo Branco',
      // o email deve estar registrado nas configurações do SES
      email: 'contato@breno.com',
    },
  },
} as MailDriver;
