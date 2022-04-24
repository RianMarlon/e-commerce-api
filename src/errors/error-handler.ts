import { NextFunction, Request, Response } from 'express';

export class ErrorHandler {
  handleError(
    error: any,
    _request: Request,
    response: Response,
    _next: NextFunction,
  ) {
    if (error.statusCode) {
      return response.status(error.statusCode).json({
        statusCode: error.statusCode,
        message: error.message,
        badFields: error.badFields ?? undefined,
      });
    } else if (error.message) {
      return response.status(500).json({
        statusCode: 500,
        message: error.message,
      });
    }

    return response.status(500).json({
      message: 'Unexpected error',
      statusCode: 500,
    });
  }
}
