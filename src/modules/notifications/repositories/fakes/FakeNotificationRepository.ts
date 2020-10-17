import { ObjectID } from 'mongodb';
import CreateNotificationDTO from '@modules/notifications/dtos/CreateNotificationDTO';
import Notification from '@modules/notifications/infra/typeorm/schemas/notifications';
import NotificationRepositoryInterface from '../NotificationRepositoryInterface';

export default class FakeNotificationRepository
  implements NotificationRepositoryInterface {
  notification: Notification[] = [];

  public async create({
    recipient_id,
    content,
  }: CreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), recipient_id, content });

    return notification;
  }
}
