import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DateIdea } from '../date/date.entity';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany( () => DateIdea, (date) => date.user )
  dates: DateIdea[];

  @Column()
  name: string;

  @Column()
  partner_name: string;

}