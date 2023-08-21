import { ApiProperty } from '@nestjs/swagger';

export class GetUserByRoleDto {
  @ApiProperty({ example: 'admin', description: 'User role' })
  readonly role: string;
}
