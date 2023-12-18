import { IsDateString, IsNumber, IsOptional } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Quiz } from './quiz.entity';

@Entity()
export class QuizCompletion {
  @IsNumber()
  @IsOptional()
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Quiz, (quiz) => quiz.quizCompletion, { eager: false })
  @JoinColumn({ name: 'quizId' })
  quiz: Quiz;

  @Column()
  @IsNumber()
  @IsOptional()
  quizId: number;

  @IsDateString()
  @IsOptional()
  @Column()
  completedAt: Date;

  @ManyToOne(() => User, (user) => user.quizCompletion, { eager: false })
  @JoinColumn({ name: 'userId' })
  completedBy: User;

  @Column()
  @IsNumber()
  @IsOptional()
  userId: number;

  constructor(quizId: number, userId: number, completedAt: Date) {
    this.quizId = quizId;
    this.userId = userId;
    this.completedAt = completedAt;
  }
}
