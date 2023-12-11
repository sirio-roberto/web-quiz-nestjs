import { Injectable } from '@nestjs/common';
import { Quiz } from './entities/quiz.entity';
import { ResponseEntity } from './entities/response.entity';

@Injectable()
export class QuizzesService {
  private quiz: Quiz = {
    title: 'The Java Logo',
    text: 'What is depicted on the Java logo?',
    options: ['Robot', 'Tea leaf', 'Cup of coffee', 'Bug'],
  };

  create(quiz: Quiz) {
    return 'This action adds a new quiz';
  }

  findAll() {
    return this.quiz;
  }

  answerQuestion(answer: number) {
    if (answer === 2) {
      return new ResponseEntity(true, "Congratulations, you're right!");
    } else {
      return new ResponseEntity(false, 'Wrong answer! Please, try again.');
    }
  }
}
