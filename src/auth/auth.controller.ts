import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async registerUser(
    @Body()
    registerUserDto: RegisterUserDto,
  ) {
    await this.authService.register(registerUserDto);

    return;
  }

  @Post('/login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    const result = await this.authService.login(loginUserDto);

    return result;
  }
}
