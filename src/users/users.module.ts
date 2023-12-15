import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { HttpStrategy } from 'src/auth/http-strategy.auth';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'basic' }),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, HttpStrategy],
})
export class UsersModule {}
