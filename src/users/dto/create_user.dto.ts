// src/dates/dto/create-date.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'juan1' ,description: 'juancito333' })
  username: string;

  @ApiProperty({ example: '1234' , description: 'contraseñaSecreta333' })
  password: string;

  @ApiProperty({ example: 'juampi', description: 'nombre del usuario' })
  name: string;

  @ApiProperty({ example: 'pili', description: 'nombre de la pareja' })
  partner_name: string;

}


