import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create_user.dto';
import { DateService } from '../date/date.service';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly dateService: DateService,
  ) {}

  findUserByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username: username },
    });
  }

  findUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(userDto: CreateUserDto) {
    const newUser = this.userRepository.create(userDto);
    const savedUser = await this.userRepository.save(newUser);

    await this.dateService.seedDefaultDatesForUser(savedUser.id);

    return savedUser;
  }
}
