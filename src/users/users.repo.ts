import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersRepo {
  constructor(private readonly prisma: PrismaService) {}

  findAll(where: Prisma.UserWhereInput = {}) {
    return this.prisma.user.findMany({ where });
  }

  findUniqueBy(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({ where });
  }

  findOneBy(where: Prisma.UserWhereInput = {}) {
    return this.prisma.user.findFirst({ where });
  }

  create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({ data, where });
  }

  delete(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({ where });
  }
}
