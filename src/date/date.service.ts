import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DateIdea } from './date.entity';
import { CreateDateDto } from './dto/create_date.dto';


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
