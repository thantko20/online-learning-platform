import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from './password.service';
import { UtilsService } from 'src/utils/utils.service';
import { LoginUserDto } from './dtos/login-user.dto';
import { RegisterUserDto } from './dtos/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly utilsService: UtilsService,
  ) {}

  async login({ email, password }: LoginUserDto) {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException('INVALID_CREDENTIALS');
    }

    const isCorrectPassword = await this.passwordService.comparePasswords(
      user.password,
      password,
    );

    if (!isCorrectPassword) {
      throw new BadRequestException('INVALID_CREDENTIALS');
    }

    const payload = { userId: user.id, email: user.email };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: this.utilsService.excludeFields(user, ['password']),
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    const user = await this.usersService.createUser(registerUserDto);

    return user;
  }
}
