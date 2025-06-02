import {EHttpResponseStatus} from '../../enums/http.enum';

interface IBaseResponseModel {
  data?: any;
  requestId?: string;
  message: string;
  timestamp?: string;
  status: EHttpResponseStatus | number;
  isSuccess: boolean;
}

export {IBaseResponseModel};
