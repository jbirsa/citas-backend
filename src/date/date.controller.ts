import { DateService } from './date.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateDateDto } from './dto/create_date.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Date')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('dates')
export class DateController {
  constructor(private readonly datesService: DateService) {}

  @Get()
  getAllDates(@Request() req) {
    const userId = req.user?.userId;
    return this.datesService.findAll(userId);
  }

  @Post()
  create(@Body() createDateDto: CreateDateDto, @Request() req) {
    const userId = req.user?.userId;
    return this.datesService.create(createDateDto, userId);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Request() req) {
    const userId = req.user?.userId;
    return this.datesService.remove(+id, userId);
  }

  @Get('price/:price')
  getDatesWithPrice(@Param('price') price: string, @Request() req) {
    const userId = req.user?.userId;
    return this.datesService.getDatesWithPrice(price, userId);
  }

  @Get('time/:time')
  getDatesWithTime(@Param('time') time: string, @Request() req) {
    const userId = req.user?.userId;
    return this.datesService.getDatesWithTime(time, userId);
  }

  @Get(':price/:time')
  getDatesWithPriceAndTime(
    @Param('price') price: string,
    @Param('time') time: string,
    @Request() req,
  ) {
    const userId = req.user?.userId;
    return this.datesService.getDatesWithPriceAndTime(price, time, userId);
  }
}
