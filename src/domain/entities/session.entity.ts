import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'sessions' })
export class Session {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({
    name: 'access_token',
    type: 'varchar',
    length: 255,
  })
  accessToken: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timetz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timetz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Index()
  @OneToOne(() => User, (user) => user.session, {
    nullable: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
