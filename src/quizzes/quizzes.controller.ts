import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { Quiz } from './entities/quiz.entity';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  postAnswer(@Query() query: any) {
    return this.quizzesService.answerQuestion(parseInt(query.answer));
  }

  @Post()
  create(@Body() quiz: Quiz) {
    return this.quizzesService.create(quiz);
  }

  @Get()
  findAll() {
    return this.quizzesService.findAll();
  }
}
