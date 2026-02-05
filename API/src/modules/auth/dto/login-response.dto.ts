export class LoginResponseDto {
  access_token: string;
  user: {
    id: string;
    email: string;
    created_at: Date;
  };
  message: string;
}

export class MessageResponseDto {
  message: string;
}
