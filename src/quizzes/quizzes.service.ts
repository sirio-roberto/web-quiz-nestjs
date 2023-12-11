import { Injectable } from '@nestjs/common';
import { Quiz } from './entities/quiz.entity';

@Injectable()
export class QuizzesService {
  create(quiz: Quiz) {
    return 'This action adds a new quiz';
  }

  findAll() {
    return `This action returns all quizzes`;
  }
}
