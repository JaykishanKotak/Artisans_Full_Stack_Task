// logout.guard.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { validateTokenPayload } from '../../../common/validator/token.validator';

@Injectable()
export class LogoutGuard extends JwtAuthGuard {
  handleRequest(err: any, user: any): any {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    validateTokenPayload(user);

    return user;
  }
}
