import { Injectable } from '@nestjs/common';
import { UsersRepo } from './users.repo';
import { Prisma } from '@prisma/client';
import { GetUsersQueryDto } from './dto/get-users-query.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepo) {}

  getAllUsers(where?: GetUsersQueryDto) {
    return this.usersRepo.findAll({
      email: where?.email,
      name: {
        contains: where?.name,
        mode: 'insensitive',
      },
    });
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
