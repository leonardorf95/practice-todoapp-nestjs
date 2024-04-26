import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Session } from './session.entity';
import { Todos } from './todo.entity';
import { BaseEntity } from '../common/BaseEntity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Index()
  @Column({
    name: 'full_name',
    type: 'varchar',
    length: 255,
  })
  fullName: string;

  @Index()
  @Column({
    type: 'varchar',
    length: 255,
  })
  email: string;

  @Exclude()
  @Column({
    type: 'varchar',
    length: 255,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 255,
  })
  role: string;

  @OneToOne(() => Session, (session) => session.user, {
    nullable: true,
  })
  session: Session;

  @OneToMany(() => Todos, (todos) => todos.user, {
    nullable: true,
  })
  @JoinColumn({ name: 'user_id' })
  todo: Todos[];
}
