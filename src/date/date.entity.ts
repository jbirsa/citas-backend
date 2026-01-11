// src/dates/date.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/users.entity';

@Entity('dates') // Nombre exacto de la tabla en SQL
export class DateIdea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  is_done: boolean;

  @Column({ nullable: true })
  description: string;

  @Column()
  time: string;

  @Column()
  money: string;

  @ManyToOne(() => User, (user) => user.dates)
  @JoinColumn({ name: 'userid' })
  user: User;
}
