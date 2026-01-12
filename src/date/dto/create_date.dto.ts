// src/dates/dto/create-date.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateDateDto {
  @ApiProperty({
    example: 'Cena en Puerto Madero',
    description: 'Título de la cita',
  })
  name: string;

  @ApiProperty({ example: 'Llevar abrigo', description: 'Detalles extra' })
  description: string;

  @ApiProperty({ example: 'Night', description: 'Momento del día' })
  time: string;

  @ApiProperty({ example: 'Medium', description: 'Rango de precio' })
  money: string;
}
