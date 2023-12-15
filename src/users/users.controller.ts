import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() user: User) {
    return this.usersService.register(user);
  }

  @UseGuards(AuthGuard('basic'))
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
