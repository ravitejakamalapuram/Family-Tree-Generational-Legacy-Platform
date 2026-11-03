import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import type { Request, Response } from 'express';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionBody = exception instanceof HttpException ? exception.getResponse() : null;
    const body =
      typeof exceptionBody === 'object' && exceptionBody !== null
        ? (exceptionBody as { message?: unknown; error?: unknown })
        : null;
    const rawMessage =
      typeof exceptionBody === 'string'
        ? exceptionBody
        : typeof body?.message === 'string'
          ? body.message
          : 'Request failed.';
    const message = status >= 500 ? 'An unexpected error occurred.' : rawMessage;
    const code =
      status === 400
        ? 'VALIDATION_ERROR'
        : status === 401
          ? 'UNAUTHENTICATED'
          : status === 403
            ? 'FORBIDDEN'
            : status === 404
              ? 'NOT_FOUND'
              : status === 409
                ? 'CONFLICT'
                : status === 429
                  ? 'RATE_LIMITED'
                  : status === 503
                    ? 'NOT_READY'
                    : status >= 500
                      ? 'INTERNAL_ERROR'
                      : 'REQUEST_FAILED';

    response.status(status).json({
      error: {
        code,
        message,
        requestId: request.headers['x-request-id'] ?? null,
      },
    });
  }
}
