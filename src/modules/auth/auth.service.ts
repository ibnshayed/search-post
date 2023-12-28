import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DataServices, UserEntity } from './../../repository';
import { LoginDto, RefreshTokenDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DataServices,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private async getAccessToken(user: UserEntity) {
    return await this.jwtService.signAsync(
      {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      {
        secret: this.configService.get('accessToken.secret'),
        expiresIn: this.configService.get('accessToken.expireIn'),
      },
    );
  }

  private async getRefreshToken(user: UserEntity) {
    return await this.jwtService.signAsync(
      {
        _id: user._id,
      },
      {
        secret: this.configService.get('refreshToken.secret'),
        expiresIn: this.configService.get('refreshToken.expireIn'),
      },
    );
  }

  async login(dto: LoginDto) {
    const { username, password } = dto;
    const user = await this.db.user.findOne({
      filter: {
        $or: [{ username }, { email: username }, { mobile: username }],
      },
      projection: '_id +password username firstName lastName',
    });

    if (!user) {
      return new HttpException('Invalid credential', HttpStatus.BAD_REQUEST);
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      return new HttpException('Invalid credential', HttpStatus.BAD_REQUEST);
    }
    const [accessToken, refreshToken] = await Promise.all([
      this.getAccessToken(user),
      this.getRefreshToken(user),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(dto: RefreshTokenDto) {
    const { refreshToken: token } = dto;
    const verifyToken = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get('refreshToken.secret'),
    });
    if (!verifyToken) {
      return new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }
    const decodeToken = await this.jwtService.decode(token);
    const { _id } = decodeToken;
    const user = await this.db.user.findOneById(_id);
    if (!user) {
      return new HttpException('Invalid credential', HttpStatus.BAD_REQUEST);
    }
    const [accessToken, refreshToken] = await Promise.all([
      this.getAccessToken(user),
      this.getRefreshToken(user),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
