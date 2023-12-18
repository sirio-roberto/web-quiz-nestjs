import {
  Controller,
  Get,
  Post,
  Body,
  ParseIntPipe,
  Param,
  UseGuards,
  Delete,
  Request,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { Quiz } from './entities/quiz.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('basic'))
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  create(@Body() quiz: Quiz, @Request() req: any) {
    return this.quizzesService.create(quiz, req.user);
  }

  @Post(':id/solve')
  postAnswer(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() answerObj: any,
    @Request() req: any,
  ) {
    return this.quizzesService.answerQuestion(id, answerObj, req.user);
  }

  @Get('completed')
  findAllCompleted(@Query('page') page: number = 1, @Request() req: any) {
    return this.quizzesService.findAllCompleted(
      {
        page,
        limit: 10,
        route: 'http://localhost:3000/quizzes',
      },
      req.user,
    );
  }

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    limit = limit > 50 ? 50 : limit;
    return this.quizzesService.findAll({
      page,
      limit,
      route: 'http://localhost:3000/quizzes',
    });
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.quizzesService.findOne(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteQuizz(
    @Param('id', new ParseIntPipe()) id: number,
    @Request() req: any,
  ) {
    return this.quizzesService.delete(id, req.user);
  }
}
