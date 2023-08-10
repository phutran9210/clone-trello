import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsCustomUUID(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsCustomUUID',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const re = /^[1234567890abcdef]{10}$/;
          return typeof value === 'string' && re.test(value);
        },
      },
    });
  };
}
