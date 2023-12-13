import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginData: { login: string; senha: string }) {
    console.log(loginData);
    const user = await this.authService.validateCredentials(
      loginData.login,
      loginData.senha,
    );

    return this.authService.login(user);
  }
}
