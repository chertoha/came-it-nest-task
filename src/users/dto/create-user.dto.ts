import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'chertoha_13', description: 'User short name' })
  readonly username: string;

  @ApiProperty({ example: 'email@mail.com', description: 'E-mail' })
  readonly email: string;
}
