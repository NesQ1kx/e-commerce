import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { JwtPayload } from 'src/intefaces/jwt-payload.interface';
import { ISuccessLogin } from 'src/intefaces/login-success.interface';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  public async signup(createUserDto: CreateUserDto): Promise<ISuccessLogin> {
    const isUserExist = await this.userService.isUserExist(createUserDto.email);
    if (isUserExist) {
      throw new HttpException(
        'Пользователь с таким e-mail уже существует',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      await this.userService.create(createUserDto);
      return {
        accessToken: this.createAccessToken(createUserDto.email),
      };
    }
  }

  public async login(loginUserDto: LoginUserDto): Promise<ISuccessLogin> {
    const isUserExist = await this.userService.isUserExist(loginUserDto.email);
    if (!isUserExist) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    const isValidPassword = await this.userService.checkUserPassword(
      loginUserDto.email,
      loginUserDto.password,
    );

    if (!isValidPassword) {
      throw new HttpException('Неверный пароль', HttpStatus.UNAUTHORIZED);
    }

    return {
      accessToken: this.createAccessToken(loginUserDto.email),
    };
  }

  public createAccessToken(email: string): string {
    return this.jwtService.sign({ email });
  }

  public async decode(token: string): Promise<string> {
    const email = this.jwtService.decode(token)['email'];
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('Неверный токен', HttpStatus.UNAUTHORIZED);
    }
    return email;
  }
}
