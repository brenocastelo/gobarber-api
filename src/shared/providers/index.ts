/**
 * o container.resolve já está sendo executado, porém ele tem dependência
 * do template provider que ainda não foi registrado no container
 */
import './TemplateMailProvider';
import './MailProvider';
import './StorageProvider';
import './CacheProvider';
