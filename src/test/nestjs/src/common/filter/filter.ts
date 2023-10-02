import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

interface IResponseMsg {
  statusCode: number;
  message: string[] | string;
  error: string;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;

    const responseMsg: IResponseMsg = exception.getResponse() as IResponseMsg;

    response.status(status).json({
      success: false,
      data: exception.getResponse(),
      message: Array.isArray(responseMsg.message)
        ? responseMsg.message[0]
        : message,
    });
  }
}
