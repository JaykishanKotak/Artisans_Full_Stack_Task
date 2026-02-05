import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiResponse<T> {
  message: string;
  error: string | null;
  data: T | null;
  status: number;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponse<T>> {
    const response = context
      .switchToHttp()
      .getResponse<{ statusCode: number }>();
    const status: number = response.statusCode;

    return next.handle().pipe(
      map((data: T | { message: string }) => {
        let message = 'Success';
        let responseData: T | null = data as T;

        if (this.hasMessage(data)) {
          message = data.message;

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { message: _, ...rest } = data as Record<string, unknown>;

          responseData = Object.keys(rest).length > 0 ? (rest as T) : null;
        }

        return {
          message,
          error: null,
          data: responseData ?? null,
          status,
        };
      }),
    );
  }

  private hasMessage(value: unknown): value is { message: string } {
    return (
      typeof value === 'object' &&
      value !== null &&
      'message' in value &&
      typeof (value as any).message === 'string'
    );
  }
}
