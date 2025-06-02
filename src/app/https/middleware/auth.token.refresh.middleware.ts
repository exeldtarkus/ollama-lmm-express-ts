import {Response, NextFunction} from 'express';
import {BaseResponse} from '../resources/base.response';
import {logger} from '../../configs/logger.config';
import {
  decodeToken,
  generateAccessToken,
  verifyRefreshToken,
} from '../../configs/jwt.config';
import {IMainRequest} from '../requests/main.request';
import {EHttpResponseStatus} from '../../enums/http.enum';

export function refreshTokenMiddleware(
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
      status: EHttpResponseStatus.Unauthorized,
    });
  }

  const token = authHeader.split(' ')[1];

  const verify = verifyRefreshToken(token);

  if (!verify.valid) {
    logger.error(`Unauthorized: ${verify.message}`);
    return BaseResponse.exec(res, {
      message: `Unauthorized: ${verify.message}`,
      isSuccess: false,
      requestId: req.requestId,
      status: EHttpResponseStatus.Unauthorized,
    });
  }

  const decode = decodeToken(token);

  if (!decode.valid) {
    logger.error(`Unauthorized: ${verify.message}`);
    return BaseResponse.exec(res, {
      message: `Unauthorized: ${verify.message}`,
      isSuccess: false,
      requestId: req.requestId,
      status: EHttpResponseStatus.Unauthorized,
    });
  }

  const newAccessToken = generateAccessToken({
    sub: decode.payload.sub,
    username: decode.payload.username,
  });

  req.token = newAccessToken;
  req.refreshToken = token;

  return next();
}
