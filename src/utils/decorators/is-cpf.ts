import { registerDecorator, ValidationOptions } from 'class-validator';

import { isCPF } from '../is-cpf';

export function IsCPF(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isCPF',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `${propertyName} must be a CPF`,
        ...validationOptions,
      },
      validator: {
        validate(value: unknown) {
          return typeof value === 'string' && isCPF(value);
        },
      },
    });
  };
}
