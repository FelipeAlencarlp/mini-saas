import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidPhone', async: false })
export class IsValidPhoneConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    if (typeof value !== 'string') return false;
    // Remove tudo que não for dígito
    const cleaned = value.replace(/\D/g, '');

    return cleaned.length === 10 || cleaned.length === 11;
  }

  defaultMessage() {
    return 'Telefone inválido. Formato esperado: (DD) 9XXXX-XXXX ou (DD) XXXX-XXXX';
  }
}

export function IsValidPhone(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidPhoneConstraint,
    });
  };
}