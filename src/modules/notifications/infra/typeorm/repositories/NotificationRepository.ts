import { getMongoRepository, MongoRepository } from 'typeorm';

import CreateNotificationDTO from '@modules/notifications/dtos/CreateNotificationDTO';
import NotificationRepositoryInterface from '@modules/notifications/repositories/NotificationRepositoryInterface';
import Notification from '@modules/notifications/infra/typeorm/schemas/notifications';

export default class NotificationRepository
  implements NotificationRepositoryInterface {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: CreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipient_id,
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}
