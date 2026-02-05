import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @IsString({ message: 'Email must be a string' })
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail(
    {
      allow_display_name: false,
      allow_utf8_local_part: false,
      require_tld: true,
      allow_ip_domain: false,
    },
    { message: 'Please provide a valid email address' },
  )
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}

export class RegisterDto extends LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
}

export class LogoutDto {
  @IsString()
  @IsNotEmpty({ message: 'Token is required' })
  token: string;
}
