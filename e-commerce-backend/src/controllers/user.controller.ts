import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AuthService } from 'src/services/auth.service';
import { Response } from 'express';

@Controller('/api/v1/user')
export class UserController {
  // constructor(public authSerivce: AuthService) {}
  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // public async getProfile(@Res() response: Response): Promise<void> {
  //   response.json();
  // }
}
