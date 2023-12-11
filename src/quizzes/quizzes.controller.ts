import { Controller, Get, Post, Body } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { Quiz } from './entities/quiz.entity';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  create(@Body() quiz: Quiz) {
    return this.quizzesService.create(quiz);
  }

  @Get()
  findAll() {
    return this.quizzesService.findAll();
  }
}
