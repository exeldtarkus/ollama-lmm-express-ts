import {Response} from 'express';
import moment from 'moment';
import {IBaseResponseModel} from '../../models/resource_models/i.base.resource.model';
import {ELogStage, logger} from '../../configs/logger.config';

class BaseResponse {
  static exec(res: Response, data: IBaseResponseModel): any {
    logger.info(ELogStage.end);
    return res.status(data.status).json({
      data: data.data,
      isSuccess: data.isSuccess,
      message: data.message,
      status: data.status,
      requestId: data.requestId,
      timestamp: moment().utc().format('YYYY-MM-DDTHH:mm:ssZZ'),
    });
  }
}

export {BaseResponse};
