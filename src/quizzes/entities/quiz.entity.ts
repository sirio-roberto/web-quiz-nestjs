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
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Quiz {
  @IsNumber()
  @IsOptional()
  @PrimaryGeneratedColumn()
  id?: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  title: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  text: string;

  @ArrayMinSize(2)
  @IsArray()
  @IsNotEmpty()
  @Validate(IsStringArray)
  @Column('simple-json')
  options: string[];

  @IsArray()
  @IsOptional()
  @Validate(IsNumberArray)
  @Column('simple-json')
  answer?: number[];
}
