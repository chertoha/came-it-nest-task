import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class DefaultProfileDto {
  @ApiProperty({ example: 'Anton', description: 'User first name' })
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  @IsOptional()
  readonly firstName: string;

  @ApiProperty({ example: 'Chertok', description: 'User last name' })
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  @IsOptional()
  readonly lastName: string;

  @ApiProperty({ example: 'male', description: 'User state' })
  @IsString()
  @IsIn(['male', 'female', 'other'])
  @IsOptional()
  readonly state: string;
}
