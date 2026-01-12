// src/dates/dto/create-date.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'juan1', description: 'juancito333' })
  username: string;

  @ApiProperty({ example: '1234', description: 'contraseñaSecreta333' })
  password: string;
}
