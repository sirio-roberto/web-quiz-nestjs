import { Injectable } from '@nestjs/common';
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

  answerQuestion(answer: number) {
    if (answer === 2) {
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
