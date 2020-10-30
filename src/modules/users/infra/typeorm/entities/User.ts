import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import storageConfig from '@config/storage';

import { Exclude, Expose } from 'class-transformer';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) return null;

    const url =
      process.env.STORAGE_DRIVER === 'disk'
        ? `${process.env.APP_API_URL}/files/${this.avatar}`
        : `https://${storageConfig.configs.s3.bucket}.s3.amazonaws.com/${this.avatar}`;

    return url;
  }
}

export default User;
