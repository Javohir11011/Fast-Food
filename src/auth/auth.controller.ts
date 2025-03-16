import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuhtDto } from './dto/create-auth.dto';
import { Public } from 'src/config/jwt/public.decorator';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() registerAuthDto: RegisterAuhtDto) {
    return this.authService.register(registerAuthDto);
  }

  @Public()
  @Post('login')
  login(@Body() registerAuthDto: LoginAuthDto) {
    return this.authService.login(registerAuthDto);
  }
}
