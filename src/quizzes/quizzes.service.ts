import { BadRequestException, Injectable } from '@nestjs/common';
import { Quiz } from './entities/quiz.entity';
import { ResponseEntity } from './entities/response.entity';

@Injectable()
export class QuizzesService {
  private quizzes: Quiz[] = [];
  private currentId: number = 1;

  create(quiz: Quiz) {
    quiz.id = this.currentId++;
    if (!quiz.answer) {
      quiz.answer = [];
    }
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

  answerQuestion(id: number, answerObj: any) {
    const quiz: Quiz = this.findByIdOrThrow(id);

    const answerArray = answerObj.answer;

    if (this.arraysEqual(quiz.answer, answerArray)) {
      return new ResponseEntity(true, "Congratulations, you're right!");
    } else {
      return new ResponseEntity(false, 'Wrong answer! Please, try again.');
    }
  }

  arraysEqual(array1: any[], array2: any[]) {
    if (!array1 || !array2 || array1.length !== array2.length) {
      return false;
    }
    const sortedArray1 = array1.sort();
    const sortedArray2 = array2.sort();

    for (let i = 0; i < array1.length; i++) {
      if (sortedArray1[i] !== sortedArray2[i]) {
        return false;
      }
    }

    return true;
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
