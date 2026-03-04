import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';


@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService){}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('profile')
  async getProfile(@Req() req){
    const userId = Number(req.user?.userId);
    const user = await this.usersService.findUserById(userId);

    if(!user){
      return null;
    }

    return {
      userId: user.id,
      username: user.username,
      name: user.name,
      partner_name: user.partner_name,
    };
  }
}
