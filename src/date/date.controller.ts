import { DateService } from './date.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateDateDto } from './dto/create_date.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Date')
@Controller('dates')
export class DateController {
  constructor(private readonly datesService: DateService) {}

  @Get()
  getAllDates() {
    return this.datesService.findAll();
  }

  @Post()
  create(@Body() createDateDto: CreateDateDto) {
    return this.datesService.create(createDateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.datesService.remove(+id); // hace que el string sea un number, ya que el service necesita un number.
  }

  @Get('price/:price')
  getDatesWithPrice(@Param('price') price: string) {
    return this.datesService.getDatesWithPrice(price);
  }

  @Get('time/:time')
  getDatesWithTime(@Param('time') time: string) {
    return this.datesService.getDatesWithTime(time);
  }

  @Get(':price/:time')
  getDatesWithPriceAndTime(
    @Param('price') price: string,
    @Param('time') time: string,
  ) {
    return this.datesService.getDatesWithPriceAndTime(price, time);
  }
}
