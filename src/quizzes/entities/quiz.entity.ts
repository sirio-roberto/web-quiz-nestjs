import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { IsNumberArray } from 'src/validator/is-number-array.validator';
import { IsStringArray } from 'src/validator/is-string-array.validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @ManyToOne(() => User, (user) => user.quiz, { eager: false })
  @JoinColumn({ name: 'userId' })
  createdBy: User;

  @Column()
  @IsOptional()
  userId: number;
}
