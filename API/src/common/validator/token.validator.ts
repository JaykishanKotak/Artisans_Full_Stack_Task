// token.validator.ts
import { UnauthorizedException } from '@nestjs/common';

export interface TokenPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

export function validateTokenPayload(payload: any): TokenPayload {
  if (!payload) {
    throw new UnauthorizedException('Invalid token payload');
  }

  if (typeof payload.userId !== 'string') {
    throw new UnauthorizedException('UserId missing');
  }

  if (typeof payload.email !== 'string') {
    throw new UnauthorizedException('Email missing');
  }

  return payload as TokenPayload;
}
