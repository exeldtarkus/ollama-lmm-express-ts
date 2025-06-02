import {
  ESortDirection,
  IRepositoryParam,
} from '../../repositories/i.repository';

interface ISlikValidationProgressTbl {
  id: number;
  request_id: string;
  period: string;
  segment: 'D01' | 'F01';
  batch_data: number;
  offset_data: number;
  limit_data: number;
  order_by_column_data: string;
  order_by_direction_data: ESortDirection;
  message_data: string | null;
  finish_status: 'done' | 'failed' | 'on_progress' | 'complete' | null;
  finish_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

type ColumnNames = '*' | keyof ISlikValidationProgressQueryOutput | '*';
interface ISlikValidationProgressParams extends IRepositoryParam<ColumnNames> {
  q?: {
    id?: number;
    requestId?: string;
    period?: string;
    periodYear?: number;
    flagDetail?: string;
    batchData?: number;
    segment?: 'D01' | 'F01';
  };
}

interface ISlikValidationProgressQueryOutput
  extends ISlikValidationProgressTbl {
  total_data?: number;
}

interface ISlikValidationProgressUpdatedQuery
  extends Partial<ISlikValidationProgressTbl> {}
interface ISlikValidationProgressInsertQuery
  extends Omit<ISlikValidationProgressTbl, 'id'> {}

export {
  ISlikValidationProgressTbl,
  ISlikValidationProgressParams,
  ISlikValidationProgressQueryOutput,
  ISlikValidationProgressUpdatedQuery,
  ISlikValidationProgressInsertQuery,
};
