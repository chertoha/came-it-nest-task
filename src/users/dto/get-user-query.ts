import { ApiProperty } from '@nestjs/swagger';

export class GetUserQueryDto {
  @ApiProperty({ example: 'admin', description: 'User role' })
  readonly role: string;
}
