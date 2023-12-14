import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { Quiz } from './entities/quiz.entity';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  create(@Body() quiz: Quiz) {
    return this.quizzesService.create(quiz);
  }

  @Post(':id')
  postAnswer(@Param('id', new ParseIntPipe()) id: number, @Query() query: any) {
    return this.quizzesService.answerQuestion(id, parseInt(query.answer));
  }

  @Get()
  findAll() {
    return this.quizzesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.quizzesService.findOne(id);
  }
}
