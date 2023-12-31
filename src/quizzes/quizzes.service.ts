import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Quiz } from './entities/quiz.entity';
import { ResponseEntity } from './entities/response.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { QuizCompletion } from './entities/quiz-completion.entity';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepo: Repository<Quiz>,
    @InjectRepository(QuizCompletion)
    private quizCompletionRepo: Repository<QuizCompletion>,
  ) {}

  async create(quiz: Quiz, user: User) {
    if (!quiz.answer) {
      quiz.answer = [];
    }

    quiz.userId = user.id;

    const dbQuiz = await this.quizRepo.save(quiz);

    return this.getQuizWithoutAnswer(dbQuiz);
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<Quiz>> {
    const query = this.quizRepo.createQueryBuilder('q');
    query.select(['q.id', 'q.title', 'q.text', 'q.options']);
    return paginate<Quiz>(query, options);
  }

  async findAllCompleted(
    options: IPaginationOptions,
    user: User,
  ): Promise<Pagination<QuizCompletion>> {
    const query = this.quizCompletionRepo.createQueryBuilder('q');
    query
      .select(['q.quizId', 'q.completedAt'])
      .where('q.userId = :userId', { userId: user.id })
      .orderBy('q.completedAt', 'DESC');
    return paginate<QuizCompletion>(query, options);
  }

  async findOne(id: number) {
    try {
      const quiz: Quiz = await this.quizRepo.findOneByOrFail({ id });
      return this.getQuizWithoutAnswer(quiz);
    } catch {
      throw new BadRequestException('Quiz not found');
    }
  }

  async answerQuestion(id: number, answerObj: any, user: User) {
    try {
      const quiz: Quiz = await this.quizRepo.findOneByOrFail({ id });
      const answerArray = answerObj.answer;

      if (this.arraysEqual(quiz.answer, answerArray)) {
        const quizCompletion = new QuizCompletion(quiz.id, user.id, new Date());
        this.quizCompletionRepo.save(quizCompletion);
        return new ResponseEntity(true, "Congratulations, you're right!");
      } else {
        return new ResponseEntity(false, 'Wrong answer! Please, try again.');
      }
    } catch {
      throw new BadRequestException('Quiz not found');
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

  private getQuizWithoutAnswer(quiz: Quiz): Quiz | any {
    return {
      id: quiz.id,
      title: quiz.title,
      text: quiz.text,
      options: quiz.options,
    };
  }

  async delete(id: number, user: User) {
    let quiz: Quiz = null;
    try {
      quiz = await this.quizRepo.findOneByOrFail({ id });
    } catch {
      throw new BadRequestException('Quiz not found');
    }

    if (!user || user.id !== quiz.userId) {
      throw new ForbiddenException(
        'You can only delete quizzes created by you',
      );
    }
    await this.quizRepo.delete({ id });
  }
}
