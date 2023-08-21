import { IntersectionType, PartialType } from '@nestjs/swagger';
import { CreateProfileDto } from './create-profile-dto';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  IntersectionType(CreateUserDto, CreateProfileDto),
) {}
