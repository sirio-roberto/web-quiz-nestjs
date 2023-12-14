import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isStringArray', async: false })
export class IsStringArray implements ValidatorConstraintInterface {
  validate(arr: any[]): boolean | Promise<boolean> {
    return Array.isArray(arr) && arr.every((item) => typeof item === 'string');
  }
  defaultMessage(): string {
    return 'Each element in options must be a string';
  }
}
