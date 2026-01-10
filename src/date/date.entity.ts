// src/dates/date.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
