import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/common/zod-validation.pipe';
import {
  RegisterUserDto,
  registerUserSchema,
} from './schemas/register-user.schema';
import { LoginUserDto, loginUserSchema } from './schemas/login-user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async registerUser(
    @Body(new ZodValidationPipe(registerUserSchema))
    registerUserDto: RegisterUserDto,
  ) {
    await this.authService.register(registerUserDto);

    return;
  }

  @Post('/login')
  async loginUser(
    @Body(new ZodValidationPipe(loginUserSchema)) loginUserDto: LoginUserDto,
  ) {
    const result = await this.authService.login(loginUserDto);

    return result;
  }
}
