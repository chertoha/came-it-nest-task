import { IntersectionType } from '@nestjs/swagger';
import { DefaultProfileDto } from 'src/profiles/dto/default-profile-dto';
import { DefaultUserDto } from './default-user-dto';

export class CreateUserDto extends IntersectionType(
  DefaultUserDto,
  DefaultProfileDto,
) {}
