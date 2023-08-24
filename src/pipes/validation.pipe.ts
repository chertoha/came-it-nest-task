import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      console.log(errors);
      const message = errors.map(
        (err) =>
          `[${err.property}]: ${Object.values(err.constraints).join(', ')}`,
      );
      throw new BadRequestException(message);
    }
    return value;
  }
}
