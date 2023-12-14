import { BadRequestException, Injectable } from '@nestjs/common';
import { Quiz } from './entities/quiz.entity';
import { ResponseEntity } from './entities/response.entity';

@Injectable()
export class QuizzesService {
  private quizzes: Quiz[] = [];
  private currentId: number = 1;

  create(quiz: Quiz) {
    quiz.id = this.currentId++;
    this.quizzes.push(quiz);

    return this.getQuizWithoutAnswer(quiz);
  }

  findAll() {
    return this.quizzes.map(this.getQuizWithoutAnswer);
  }

  findOne(id: number) {
    const quiz: Quiz = this.findByIdOrThrow(id);
    return this.getQuizWithoutAnswer(quiz);
  }

  findByIdOrThrow(id: number) {
    const quiz: Quiz = this.quizzes.find((q) => q.id === id);
    if (!quiz) {
      throw new BadRequestException('Quiz not found');
    }
    return quiz;
  }

  answerQuestion(id: number, answer: number) {
    const quiz: Quiz = this.findByIdOrThrow(id);

    if (quiz.answer === answer) {
      return new ResponseEntity(true, "Congratulations, you're right!");
    } else {
      return new ResponseEntity(false, 'Wrong answer! Please, try again.');
    }
  }

  private getQuizWithoutAnswer(quiz: Quiz): Quiz {
    return {
      id: quiz.id,
      title: quiz.title,
      text: quiz.text,
      options: quiz.options,
    };
  }
}
