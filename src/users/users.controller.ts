import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { GetUsersQueryDto } from './dto/get-users-query.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(@Query() query: GetUsersQueryDto) {
    return this.usersService.getAllUsers(query);
  }

  @Public()
  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }
}
