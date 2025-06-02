import {Response, NextFunction} from 'express';
import {BaseResponse} from '../resources/base.response';
import {ELogStage, logger} from '../../configs/logger.config';
import {IMainRequest} from '../requests/main.request';
import {EHttpResponseStatusDesc} from '../../enums/http.enum';
import {IAuthLoginRequestBody} from '../requests/i.auth.login.request';

const validatorAuthLogin = (
  req: IMainRequest<IAuthLoginRequestBody>,
  res: Response,
  next: NextFunction,
) => {
  const requestBody = req.body;

  logger.info('[validatorAuthLogin]', ELogStage.start);
  logger.info('[validatorAuthLogin]', '[requestBody]', requestBody);

  if (!requestBody) {
    logger.error(`${EHttpResponseStatusDesc.BadRequest}: body not found!`);
    logger.info('[validatorAuthLogin]', ELogStage.end);

    return BaseResponse.exec(res, {
      message: `${EHttpResponseStatusDesc.BadRequest}: body not found!`,
      isSuccess: false,
      requestId: req.requestId,
      status: 401,
    });
  }

  if (!requestBody.username) {
    logger.error(`${EHttpResponseStatusDesc.BadRequest}: username not found`);
    logger.info('[validatorAuthLogin]', ELogStage.end);

    return BaseResponse.exec(res, {
      message: `${EHttpResponseStatusDesc.BadRequest}: username not found`,
      isSuccess: false,
      requestId: req.requestId,
      status: 401,
    });
  }

  if (!requestBody.password) {
    logger.error(`${EHttpResponseStatusDesc.BadRequest}: password not found`);
    logger.info('[validatorAuthLogin]', ELogStage.end);

    return BaseResponse.exec(res, {
      message: `${EHttpResponseStatusDesc.BadRequest}: password not found`,
      isSuccess: false,
      requestId: req.requestId,
      status: 401,
    });
  }

  if (!requestBody.captchaToken) {
    logger.error(
      `${EHttpResponseStatusDesc.BadRequest}: .captchaToken not found`,
    );
    logger.info('[validatorAuthLogin]', ELogStage.end);

    return BaseResponse.exec(res, {
      message: `${EHttpResponseStatusDesc.BadRequest}: .captchaToken not found`,
      isSuccess: false,
      requestId: req.requestId,
      status: 401,
    });
  }

  logger.info('[validatorAuthLogin]', ELogStage.end);

  return next();
};

export default validatorAuthLogin;
