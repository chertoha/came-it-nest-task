import { IntersectionType, PartialType } from '@nestjs/swagger';
import { DefaultProfileDto } from 'src/profiles/dto/default-profile-dto';
import { DefaultUserDto } from './default-user-dto';

// export class CreateUserDto {
//   @ApiProperty({ example: 'chertoha_13', description: 'User short name' })
//   readonly username: string;

//   @ApiProperty({ example: 'email@mail.com', description: 'E-mail' })
//   readonly email: string;

//   @ApiProperty({ example: 'admin', description: 'User role' })
//   readonly role: string;
// }

export class CreateUserDto extends PartialType(
  IntersectionType(DefaultUserDto, DefaultProfileDto),
) {}
