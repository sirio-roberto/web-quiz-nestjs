import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizzesModule } from './quizzes/quizzes.module';

@Module({
  imports: [QuizzesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
