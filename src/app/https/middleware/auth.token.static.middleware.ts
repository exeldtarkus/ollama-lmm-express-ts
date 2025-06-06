/* eslint-disable @typescript-eslint/no-unused-vars */
import {Response, NextFunction} from 'express';
import {BaseResponse} from '../resources/base.response';
import {logger} from '../../configs/logger.config';
import {IMainRequest} from '../requests/main.request';
import {decryptWithPrivateKey} from '../../utils/hash.util';
import {whitelistCors} from '../../configs/cors.config';
import moment from 'moment';
import env from '../../configs/env.config';

const STATIC_TOKEN = env.APP_STATIC_TOKEN;

const authStaticMiddleware = (
  req: IMainRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logger.error('Unauthorized: No token provided');
    return BaseResponse.exec(res, {
      message: 'Unauthorized: No token provided',
      isSuccess: false,
      requestId: req.requestId,
      status: 401,
    });
  }

  const token = authHeader.split(' ')[1];

  if (!STATIC_TOKEN) {
    logger.error('Unauthorized: token not set on env.');
    return BaseResponse.exec(res, {
      message: 'Unauthorized: token not set on env.',
      isSuccess: false,
      requestId: req.requestId,
      status: 401,
    });
  }

  const decrypt = decryptWithPrivateKey(token, STATIC_TOKEN);
  logger.info('decrypt', decrypt);

  // example key decrypt = 'https://www.pinjamduit.co.id-msgames-1744877330'

  if (!decrypt) {
    logger.error('Token invalid - failed decrypt token!');
    return BaseResponse.exec(res, {
      message: 'Forbidden: Invalid token',
      isSuccess: false,
      requestId: req.requestId,
      status: 401,
    });
  }

  const now = moment().format('YYYY-MM-DD HH:mm:ss');
  const tokenDecrypt = decrypt.split('-');
  const tokenDomain = tokenDecrypt[0];
  const tokenMicroservice = tokenDecrypt[1];
  const tokenCreated = tokenDecrypt[2];
  const expiredToken = moment
    .unix(Number(tokenCreated))
    .add(5, 'minutes')
    .format('YYYY-MM-DD HH:mm:ss');

  if (now > expiredToken) {
    logger.error(
      `Token invalid - now : ${now} > expiredToken : ${expiredToken}`,
    );
    return BaseResponse.exec(res, {
      message: 'Unauthorized: Token expired',
      isSuccess: false,
      requestId: req.requestId,
      status: 401,
    });
  }

  if (!whitelistCors.includes(tokenDomain)) {
    logger.error(
      `Token invalid - token [${tokenDomain}] now allowed in whitelist cors!`,
    );
    return BaseResponse.exec(res, {
      message: 'Forbidden: Invalid token',
      isSuccess: false,
      requestId: req.requestId,
      status: 401,
    });
  }

  return next();
};

export default authStaticMiddleware;
