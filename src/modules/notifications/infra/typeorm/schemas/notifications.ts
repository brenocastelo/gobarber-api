import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('notifications')
export default class Notification {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  content: string;

  @Column({ default: false })
  read: boolean;

  @Column('uuid')
  recipient_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_ate: Date;
}
