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

  findAll() {
    return this.datesRepository.find();
  }

  create(createDateDto: CreateDateDto) {
    const newDate = this.datesRepository.create(createDateDto);
    newDate.is_done = false;
    return this.datesRepository.save(newDate);
  }

  async remove(id: number) {
    const result = await this.datesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`La cita con ID ${id} no existe`);
    }

    return { message: 'La cita con ID ' + id + ' fue borrada correctamente' };
  }
}
