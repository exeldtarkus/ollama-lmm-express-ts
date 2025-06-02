import {IRepositoryParam} from '../../repositories/i.repository';

interface ISlikUserTbl {
  user_id: number;
  username: string;
  fullName: string;
  password?: string;
  email: string;
  cid_role_access: number;
  birth_date: string;
  join_date: string;
  gender: string;
  sidebar_menu: number;
  login_try: number;
  locked_sts: string;
  locked_date: string | null;
  status_user: string;
  dashboard: number;
  v_max_page: number;
  sts_detail_hide: number;
  author_date: string;
  author_user: string;
  mandatory: number;
}

type ColumnNames = '*' | keyof ISlikUserTblQueryOutput;
interface ISlikUserTblQueryParams extends IRepositoryParam<ColumnNames> {
  q?: {
    id?: number;
    uuid?: string;
    username?: string;
  };
}

interface ISlikUserTblQueryOutput extends ISlikUserTbl {
  total_data?: number;
}

interface ISlikD01P2TblInsertQuery extends ISlikUserTbl {}

interface ISlikUserTblUpdatedQuery extends Partial<ISlikUserTbl> {}

export {
  ISlikUserTbl,
  ISlikUserTblQueryParams,
  ISlikUserTblQueryOutput,
  ISlikUserTblUpdatedQuery,
  ISlikD01P2TblInsertQuery,
};
