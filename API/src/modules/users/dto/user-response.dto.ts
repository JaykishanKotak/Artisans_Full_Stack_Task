import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  id: string;
  email: string;

  @Expose({ name: 'createdAt' })
  created_at: Date;

  @Expose({ name: 'password' })
  password_hash: string;

  @Exclude()
  token: string | null;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
