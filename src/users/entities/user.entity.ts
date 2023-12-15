import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @IsNumber()
  @IsOptional()
  @PrimaryGeneratedColumn()
  id?: number;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Column()
  email: string;

  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  @Column()
  password: string;
}
