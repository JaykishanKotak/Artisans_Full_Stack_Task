import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from './dto/login.dto';
import { comparePassword } from '../../common/utils/hash.util';
import { AuthUser } from './types/auth-user.type';
import { LoginResponseDto, MessageResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<AuthUser | null> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await comparePassword(password, user.password_hash);

    if (!isPasswordValid) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
    };
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: { email: string; userId: string } = {
      email: user.email,
      userId: user.id,
    };

    const token = this.jwtService.sign(payload);

    await this.usersService.saveTokenForUser(user.id, token);

    return {
      access_token: token,
      user,
      message: 'Login successful',
    };
  }

  async register(registerDto: RegisterDto): Promise<MessageResponseDto> {
    const existingUser = await this.usersService.findByEmail(registerDto.email);

    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const { email, password, name } = registerDto;

    await this.usersService.create(email, password, name);

    return {
      message: 'User registered successfully',
    };
  }

  async logout(userId: string): Promise<MessageResponseDto> {
    await this.usersService.removeTokenForUser(userId);

    return {
      message: 'User logged out successfully',
    };
  }
}
