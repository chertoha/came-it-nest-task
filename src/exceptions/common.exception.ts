import { HttpException, HttpStatus } from '@nestjs/common';

export class CommonException extends HttpException {
  constructor(message: string, status: number) {
    if (!status) {
      super('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      return;
    }
    super(message, status);
  }
}
