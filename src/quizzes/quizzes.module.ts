import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { QuizCompletion } from './entities/quiz-completion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, QuizCompletion])],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
