import { DateIdea } from './date.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateController } from './date.controller';
import { DateService } from './date.service';

@Module({
  imports: [TypeOrmModule.forFeature([DateIdea])],
  controllers: [DateController],
  providers: [DateService],
})
export class DateModule {}
