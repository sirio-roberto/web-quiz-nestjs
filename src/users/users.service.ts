import { Injectable } from '@nestjs/common';
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
    user.password = await bcrypt.hash(user.password, 10);
    this.userRepo.save(user);
  }

  // should be edited later to hide password
  findAll() {
    return this.userRepo.find();
  }
}
