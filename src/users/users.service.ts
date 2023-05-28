import { Injectable } from '@nestjs/common';
import { UsersRepo } from './users.repo';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepo) {}

  getAllUsers(where?: Prisma.UserWhereInput) {
    return this.usersRepo.findAll(where);
  }

  getUserByEmail(email: string) {
    return this.usersRepo.findUniqueBy({ email });
  }

  getUserById(id: string) {
    return this.usersRepo.findUniqueBy({ id });
  }

  createUser(data: Prisma.UserCreateInput) {
    return this.usersRepo.create(data);
  }
}
