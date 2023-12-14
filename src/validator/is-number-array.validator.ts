import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNumberArray', async: false })
export class IsNumberArray implements ValidatorConstraintInterface {
  validate(arr: any[]): boolean | Promise<boolean> {
    return Array.isArray(arr) && arr.every((item) => typeof item === 'number');
  }
  defaultMessage(): string {
    return 'Each element in options must be a number';
  }
}
