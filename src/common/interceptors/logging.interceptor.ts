import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const before = Date.now();
    return next.handle().pipe(
      finalize(() => {
        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>();

        response.on('close', () => {
          const after = Date.now();
          const responseTime = `${after - before}ms`;

          const originalUrl = request.originalUrl;
          const statusCode = response.statusCode;

          const logPayload = JSON.stringify({
            timestamp: new Date().toISOString(),
            httpMethod: request.method,
            statusCode,
            responseTime,
            baseUrl: originalUrl,
          });

          if (statusCode < 400) {
            this.logger.log(logPayload, 'SUCCESS');
          } else if (statusCode < 500) {
            this.logger.warn(logPayload, 'USER_ERROR');
          } else {
            this.logger.error(logPayload, 'SERVER_ERROR');
          }
        });
      }),
    );
  }
}
