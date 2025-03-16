import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { RegisterAuhtDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { BcryptService } from 'src/config/bcrypt/bcrypt.service';
import { TokenService } from 'src/config/jwt/creatJwt.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: TokenService,
  ) {}
  async register(dto: RegisterAuhtDto) {
    const user = await this.repo.findOneBy({
      username: dto.username,
    });
    if (user) {
      throw new ConflictException('Username already exists');
    }

    const password = await this.bcryptService.encrypt(dto.password);

    const newUser = await this.repo.save({ ...dto, password });
    delete newUser.password;

    return newUser;
  }

  async login(data: LoginAuthDto) {
    const user = await this.repo.findOneBy({ username: data.username });

    const checkPassword = await this.bcryptService.compare(
      data.password,
      user.password,
    );

    if (!checkPassword) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = {
      id: user.id,
      role: user.id,
    };

    const accessToken = this.jwtService.createAccessToken(payload);
    const refreshToken = this.jwtService.createRefreshToken(payload);
    return {
      accessToken,
      refreshToken,
    };
  }
}
