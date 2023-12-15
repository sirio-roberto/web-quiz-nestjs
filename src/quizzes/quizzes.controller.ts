import {
  Controller,
  Get,
  Post,
  Body,
  ParseIntPipe,
  Param,
  UseGuards,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { Quiz } from './entities/quiz.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('basic'))
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  create(@Body() quiz: Quiz) {
    return this.quizzesService.create(quiz);
  }

  @Post(':id/solve')
  postAnswer(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() answerObj: any,
  ) {
    return this.quizzesService.answerQuestion(id, answerObj);
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
