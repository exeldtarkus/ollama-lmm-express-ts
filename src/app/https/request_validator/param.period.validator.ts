import {Response, NextFunction} from 'express';
import {BaseResponse} from '../resources/base.response';
import {logger} from '../../configs/logger.config';
import {IMainRequest} from '../requests/main.request';
import {
  EHttpResponseStatus,
  EHttpResponseStatusDesc,
} from '../../enums/http.enum';

export function validatorParamPeriod(
  req: IMainRequest,
  res: Response,
  next: NextFunction,
): void {
  const method = req.method.toLowerCase();
  let executePeriod = req.params.period || undefined;
  // Example value: req.params.period = "2025-04"

  if (method === 'post') {
    executePeriod = req.body?.period || undefined;
  }

  logger.info('executePeriod', executePeriod);

  if (!executePeriod) {
    logger.error(
      `${EHttpResponseStatusDesc.BadRequest}: execute period not found!`,
    );
    return BaseResponse.exec(res, {
      message: `${EHttpResponseStatusDesc.BadRequest}: execute period not found!`,
      isSuccess: false,
      requestId: req.requestId,
      status: EHttpResponseStatus.BadRequest,
    });
  }
  const periodParts = executePeriod.split('-');

  if (periodParts.length !== 2) {
    logger.error(
      `${EHttpResponseStatusDesc.BadRequest}: Invalid period format!`,
    );
    return BaseResponse.exec(res, {
      message: `${EHttpResponseStatusDesc.BadRequest}: Invalid period format! The format should be YYYY-MM.`,
      isSuccess: false,
      requestId: req.requestId,
      status: EHttpResponseStatus.BadRequest,
    });
  }

  const year = periodParts[0];
  const month = periodParts[1];

  if (!/^\d{4}$/.test(year)) {
    logger.error(`${EHttpResponseStatusDesc.BadRequest}: Invalid year format!`);
    return BaseResponse.exec(res, {
      message: `${EHttpResponseStatusDesc.BadRequest}: Invalid year format! The year should be a 4-digit number.`,
      isSuccess: false,
      requestId: req.requestId,
      status: EHttpResponseStatus.BadRequest,
    });
  }

  const monthNumber = parseInt(month, 10);
  if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
    logger.error(`${EHttpResponseStatusDesc.BadRequest}: Invalid month!`);
    return BaseResponse.exec(res, {
      message: `${EHttpResponseStatusDesc.BadRequest}: Invalid month! The month should be between 01 and 12.`,
      isSuccess: false,
      requestId: req.requestId,
      status: EHttpResponseStatus.BadRequest,
    });
  }

  return next();
}
