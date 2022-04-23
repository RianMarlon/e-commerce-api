import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

import { AppError } from '../../errors/app-error';

export class DataValidator {
  async transform<T>(value: T, schema: ClassConstructor<T>): Promise<T> {
    if (!schema || !this.toValidate(schema)) {
      return value;
    }
    const data = plainToInstance(schema, value);
    const errors = await validate(data as unknown as object);

    if (errors.length > 0) {
      const errorMessages = this.getErrorMessages(errors);
      throw new AppError(
        'Values not corresponding to expected',
        400,
        errorMessages,
      );
    }

    return value;
  }

  private toValidate(metatype: unknown): boolean {
    const types: unknown[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private getErrorMessages(errors: ValidationError[]): string[] {
    const errorMessages: string[] = [];

    errors.forEach((error) => {
      if (error.children && error.children.length > 0) {
        const errorsChildren = this.getErrorMessages(error.children);
        errorMessages.push(...errorsChildren);
      }

      if (error.constraints) {
        const errorsPerField = Object.values(error.constraints).map(
          (textError) => `${textError}`,
        );
        errorMessages.push(...errorsPerField);
      }
    });

    return errorMessages;
  }
}
