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

@Entity({ name: 'todos' })
export class Todos {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

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
  @OneToOne(() => User, (user) => user.todo, {
    nullable: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
