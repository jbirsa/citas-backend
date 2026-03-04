import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DateIdea } from './date.entity';
import { CreateDateDto } from './dto/create_date.dto';

const DEFAULT_DATES: Array<Pick<DateIdea, 'name' | 'description' | 'time' | 'money'>> = [
  {
    name: 'Picnic en el parque',
    description: 'Llevar manta, snacks y bebida favorita',
    time: 'Day',
    money: 'Low',
  },
  {
    name: 'Cena romántica en casa',
    description: 'Cocinar juntos y ver una peli',
    time: 'Night',
    money: 'Medium',
  },
  {
    name: 'Paseo en bici',
    description: 'Recorrido por la costanera al atardecer',
    time: 'Afternoon',
    money: 'Low',
  },
  {
    name: 'Spa day',
    description: 'Masajes, mascarillas y relax',
    time: 'Day',
    money: 'High',
  },
  {
    name: 'Noche de juegos',
    description: 'Competencia de juegos de mesa con snacks',
    time: 'Night',
    money: 'Low',
  },
];


@Injectable()
export class DateService {
  constructor(
    @InjectRepository(DateIdea)
    private datesRepository: Repository<DateIdea>,
  ) {}

  findAll(userId: number) {
    return this.datesRepository.find({
      where: { user: { id: userId } },
    });
  }

  findById(id: number, userId: number) {
    return this.datesRepository.find({
      where: { user: { id: userId }, id: id },
    });
  }

  create(createDateDto: CreateDateDto, userId: number) {
    const newDate = this.datesRepository.create(createDateDto);
    newDate.is_done = false;
    newDate.user = { id: userId } as any;
    return this.datesRepository.save(newDate);
  }

  async seedDefaultDatesForUser(userId: number) {
    if (!userId) return;

    const defaultEntities = DEFAULT_DATES.map((idea) => {
      const date = this.datesRepository.create({ ...idea });
      date.is_done = false;
      date.user = { id: userId };
      return date;
    });

    await this.datesRepository.save(defaultEntities);
  }

  async remove(id: number, userId: number) {
    const dateExists = await this.findById(id, userId);

    if (!dateExists || dateExists.length === 0) {
      throw new NotFoundException('La cita no fue encontrada');
    }

    const result = await this.datesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`La cita con ID ${id} no existe`);
    }

    return { message: 'La cita con ID ' + id + ' fue borrada correctamente' };
  }

  getDatesWithPriceAndTime(money: string, time: string, userId: number) {
    return this.datesRepository.find({
      where: [
        { money: money, time: time, user: { id: userId } },
        { money: money, time: 'all', user: { id: userId } },
      ],
    });
  }

  getDatesWithPrice(money: string, userId: number) {
    return this.datesRepository.find({
      where: {
        money: money,
        user: { id: userId },
      },
    });
  }

  getDatesWithTime(time: string, userId: number) {
    return this.datesRepository.find({
      where: [
        { time: time, user: { id: userId } },
        { time: 'all', user: { id: userId } },
      ],
    });
  }
}
