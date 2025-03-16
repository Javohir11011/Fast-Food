import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/auth.entity';
import { BcryptService } from 'src/config/bcrypt/bcrypt.service';
import { CustomJwtModule } from 'src/config/jwt/jwt.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CustomJwtModule],
  controllers: [AuthController],
  providers: [AuthService, BcryptService],
})
export class AuthModule {}
