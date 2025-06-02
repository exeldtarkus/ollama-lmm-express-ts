/* eslint-disable @typescript-eslint/no-unused-vars */
import {Response, NextFunction} from 'express';
import {BaseResponse} from '../resources/base.response';
import {IMainRequest} from '../requests/main.request';

interface IError extends Error {
  statusCode?: number;
}

const errorHandler = (
  err: IError,
  req: IMainRequest,
  res: Response,
  _next: NextFunction,
): void => {
  const message = err.message || 'Internal Server Error';
  const statusCode = err?.statusCode || 500;

  return BaseResponse.exec(res, {
    requestId: req.requestId,
    isSuccess: false,
    message: message,
    status: statusCode,
  });
};

export default errorHandler;
