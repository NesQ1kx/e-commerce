import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { Request, Response } from 'express';
import { AuthService } from 'src/services/auth.service';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserService } from 'src/services/user.service';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(
    private authSerivce: AuthService,
    private userService: UserService,
  ) {}

  @Post('signup')
  public async signup(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ): Promise<void> {
    const { accessToken } = await this.authSerivce.signup(createUserDto);
    response.json({ accessToken });
  }

  @Post('login')
  public async login(
    @Body() loginUserDto: LoginUserDto,
    @Res() response: Response,
  ): Promise<void> {
    const { accessToken } = await this.authSerivce.login(loginUserDto);
    response.json({ accessToken });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public async getProfile(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
    const email = await this.authSerivce.decode(
      request.headers.authorization.split('Bearer ')[1],
    );
    const user = await this.userService.findByEmail(email);
    response.json({ user });
  }
}
