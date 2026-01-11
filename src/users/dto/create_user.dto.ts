// src/dates/dto/create-date.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'juancito333' })
  username: string;

  @ApiProperty({ description: 'contraseñaSecreta333' })
  password: string;

}


