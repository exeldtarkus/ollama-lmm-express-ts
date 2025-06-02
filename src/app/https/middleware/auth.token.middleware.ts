import {Response, NextFunction} from 'express';
import {BaseResponse} from '../resources/base.response';
import {logger} from '../../configs/logger.config';
import {verifyAccessToken} from '../../configs/jwt.config';
import {IMainRequest} from '../requests/main.request';

export function authMiddleware(
  req: IMainRequest,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return BaseResponse.exec(res, {
      data: null,
      isSuccess: false,
      message: 'Unauthorized: No token provided',
      status: 401,
    });
  }

  const token = authHeader.split(' ')[1];

  const verify = verifyAccessToken(token);

  if (!verify.valid) {
    logger.error(`Unauthorized: ${verify.message}`);
    return BaseResponse.exec(res, {
      message: `Unauthorized: ${verify.message}`,
      isSuccess: false,
      requestId: req.requestId,
      status: 401,
    });
  }

  req.token = token;
  req.userId = Number(verify.payload?.sub || '0');

  return next();
}
