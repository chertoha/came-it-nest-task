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
      //   console.log(errors);
      // validation message -> throw validation exception later
      //   const message = errors.map(({ constraints }) => constraints[]);
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
