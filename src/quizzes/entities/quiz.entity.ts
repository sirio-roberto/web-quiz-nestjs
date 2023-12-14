import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { IsNumberArray } from 'src/validator/is-number-array.validator';
import { IsStringArray } from 'src/validator/is-string-array.validator';

export class Quiz {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @ArrayMinSize(2)
  @IsArray()
  @IsNotEmpty()
  @Validate(IsStringArray)
  options: string[];

  @IsArray()
  @IsOptional()
  @Validate(IsNumberArray)
  answer?: number[];
}
