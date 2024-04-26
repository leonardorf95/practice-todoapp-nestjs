import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from '../common/BaseEntity';

@Entity({ name: 'sessions' })
export class Session extends BaseEntity {
  @Index()
  @Column({
    name: 'access_token',
    type: 'varchar',
    length: 4000,
  })
  accessToken: string;

  @Index()
  @OneToOne(() => User, (user) => user.session, {
    nullable: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
