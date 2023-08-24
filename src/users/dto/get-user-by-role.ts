import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetUserByRoleDto {
  @ApiProperty({ example: 'admin', description: 'User role', required: false })
  @IsOptional()
  readonly role: string;
}
