import { Controller, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUsersQuery, getUsersQuerySchema } from './schemas/get-users.schema';
import { ZodValidationPipe } from 'src/common/zod-validation.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(
    @Query(new ZodValidationPipe(getUsersQuerySchema)) query: GetUsersQuery,
  ) {
    return this.usersService.getAllUsers(query);
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }
}
