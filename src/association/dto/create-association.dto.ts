import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAssociationDto {
  @ApiProperty()
  @IsString()
  examId: string;

  @ApiProperty()
  @IsString()
  laboratoryId: string;
}
