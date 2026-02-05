import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { hashPassword } from '../../common/utils/hash.util';
import { UserResponseDto } from './dto/user-response.dto';
import { GetProfileResponseDto } from './dto/get-profile-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id?: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(email: string, password: string, name: string): Promise<User> {
    const hashedPassword = await hashPassword(password);

    const user = this.userRepository.create({
      email,
      password_hash: hashedPassword,
      name,
    });

    return this.userRepository.save(user);
  }

  async saveTokenForUser(userId: string, token: string) {
    await this.userRepository.update(userId, { token });
  }

  async removeTokenForUser(userId: string) {
    await this.userRepository.update(userId, { token: null });
  }

  async getProfileDetail(userId: string): Promise<GetProfileResponseDto> {
    const user = await this.findById(userId);

    return new GetProfileResponseDto(new UserResponseDto(user));
  }
}
