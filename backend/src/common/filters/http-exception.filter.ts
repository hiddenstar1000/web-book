import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message = typeof res === 'object' ? res : { message: res };
    } else if (
      typeof exception === 'object' &&
      exception !== null &&
      'code' in exception &&
      (exception as any).code === 11000
    ) {
      status = HttpStatus.CONFLICT;
      message = {
        statusCode: HttpStatus.CONFLICT,
        message: 'A user with this email address already exists',
        error: 'Conflict',
      };
    }

    const errorPayload =
      typeof message === 'object'
        ? { statusCode: status, ...message }
        : { statusCode: status, message, error: 'Error' };

    response.status(status).json(errorPayload);
  }
}
