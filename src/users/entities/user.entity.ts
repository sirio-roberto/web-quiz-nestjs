import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { QuizCompletion } from 'src/quizzes/entities/quiz-completion.entity';
import { Quiz } from 'src/quizzes/entities/quiz.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @IsNumber()
  @IsOptional()
  @PrimaryGeneratedColumn()
  id?: number;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Column({ unique: true })
  email: string;

  @MinLength(5)
  @IsString()
  @IsNotEmpty()
  @Column()
  password: string;

  @OneToMany(() => Quiz, (quiz) => quiz.createdBy, { cascade: true })
  quiz: Quiz[];

  @OneToMany(() => QuizCompletion, (quizC) => quizC.completedBy, {
    cascade: true,
  })
  quizCompletion: QuizCompletion[];
}
