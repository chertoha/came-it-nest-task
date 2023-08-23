import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString, MaxLength, MinLength } from 'class-validator';

export class DefaultProfileDto {
  @ApiProperty({ example: 'Anton', description: 'User first name' })
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  readonly firstName: string;

  @ApiProperty({ example: 'Chertok', description: 'User last name' })
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  readonly lastName: string;

  @ApiProperty({ example: 'male', description: 'User state' })
  @IsString()
  @IsIn(['male', 'female', 'other'])
  readonly state: string;
}
