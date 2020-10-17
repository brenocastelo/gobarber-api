import CreateNotificationDTO from '../dtos/CreateNotificationDTO';
import Notification from '../infra/typeorm/schemas/notifications';

export default interface NotificationRepositoryInterface {
  create(data: CreateNotificationDTO): Promise<Notification>;
}
