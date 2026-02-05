import { UserResponseDto } from './user-response.dto';

export class GetProfileResponseDto {
  user: UserResponseDto;
  message: string;

  constructor(user: UserResponseDto) {
    this.user = user;
    this.message = 'User profile retrieved successfully';
  }
}
