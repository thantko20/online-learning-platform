import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const before = Date.now();
    return next.handle().pipe(
      tap({
        complete: () => {
          const request = context.switchToHttp().getRequest<Request>();
          const response = context.switchToHttp().getResponse<Response>();

          const after = Date.now();
          const responseTime = `${after - before}ms`;

          const originalUrl = request.originalUrl;
          const statusCode = response.statusCode;

          const logPayload = JSON.stringify({
            timestamp: new Date().toISOString(),
            statusCode,
            responseTime,
            baseUrl: originalUrl,
          });

          console.log(logPayload);
        },
        error: (err) => {
          const request = context.switchToHttp().getRequest<Request>();
          const response = context.switchToHttp().getResponse<Response>();

          const after = Date.now();
          const responseTime = `${after - before}ms`;

          const originalUrl = request.originalUrl;
          const statusCode = response.statusCode;

          const logPayload = JSON.stringify({
            timestamp: new Date().toISOString(),
            statusCode,
            responseTime,
            baseUrl: originalUrl,
          });

          console.log(logPayload);
        },
      }),
    );
  }
}
