import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

interface BadRequestResponse {
  statusCode: number;
  message: string[] | string;
  error: string;
}

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;
    const message = 'Input validation failed.';
    const exceptionResponse: BadRequestResponse =
      exception.getResponse() as BadRequestResponse;
    const validationFailureDetails = exceptionResponse['message'];
    response.status(status).json({
      statusCode: status,
      message,
      validationFailureDetails: validationFailureDetails,
    });
  }
}
