export type Filters = {
  status: string;
  priority: number;
  orderBy: string;
};

export type Params = {
  page?: number;
  pageSize?: number;
  search?: string;
  orderBy?: string;
  orderType?: ORDER_TYPE[0] | ORDER_TYPE[1];
  status?: TODOStatus;
};
