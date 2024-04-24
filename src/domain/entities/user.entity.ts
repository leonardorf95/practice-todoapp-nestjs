import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Session } from './session.entity';
import { Todos } from './todo.entity';

@Entity({ name: 'users' })
export class User {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({
    type: 'varchar',
    length: 255,
  })
  fullName: string;

  @Index()
  @Column({
    name: 'full_name',
    type: 'varchar',
    length: 255,
  })
  firstName: string;

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
