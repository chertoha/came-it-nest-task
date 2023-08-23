import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class DefaultUserDto {
  @ApiProperty({ example: 'chertoha_13', description: 'User short name' })
  @IsString()
  @MinLength(5)
  @MaxLength(15)
  readonly username: string;

  @ApiProperty({ example: 'email@mail.com', description: 'E-mail' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'admin', description: 'User role' })
  @IsOptional()
  @IsIn(['admin', 'guest', 'user'])
  readonly role: string;
}
