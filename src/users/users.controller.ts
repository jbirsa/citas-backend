import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService){}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req){
    return req.user;
  }
}