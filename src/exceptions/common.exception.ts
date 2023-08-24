import { HttpException, HttpStatus } from '@nestjs/common';

export class CommonException extends HttpException {
  constructor(message: string, status: number) {
    if (!status) {
      super(message, HttpStatus.INTERNAL_SERVER_ERROR);
      return;
    }
    super(message, status);
  }
}
