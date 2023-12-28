import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  private isObject(obj: any): boolean {
    return typeof obj === 'object' && obj !== null;
  }

  private trim(values) {
    Object.keys(values).forEach((key) => {
      // if (key !== 'password') {
      if (this.isObject(values[key])) {
        values[key] = this.trim(values[key]);
      } else {
        if (typeof values[key] === 'string') {
          values[key] = values[key].trim();
        }
      }
      // }
    });
    return values;
  }

  transform(values: any, metadata: ArgumentMetadata) {
    const { type } = metadata;
    if (this.isObject(values) && type === 'body') {
      return this.trim(values);
    }
    return values;
  }
}
