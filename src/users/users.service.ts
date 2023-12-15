import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async register(user: User) {
    try {
      user.password = await bcrypt.hash(user.password, 10);
      await this.userRepo.save(user);
    } catch {
      throw new BadRequestException('Email address is already taken');
    }
  }

  // should be edited later to hide password
  findAll() {
    return this.userRepo.find();
  }
}
