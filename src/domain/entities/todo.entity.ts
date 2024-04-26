import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from '../common/BaseEntity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'todos' })
export class Todos extends BaseEntity {
  @Index()
  @Column({
    name: 'title',
    type: 'varchar',
    length: 255,
  })
  title: string;

  @Index()
  @Column({
    name: 'description',
    type: 'varchar',
    length: 255,
  })
  description: string;

  @Index()
  @Column({
    name: 'is_completed',
    type: 'boolean',
    default: false,
  })
  isCompleted: boolean;

  @Exclude()
  @Index()
  @OneToOne(() => User, (user) => user.todo, {
    nullable: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
