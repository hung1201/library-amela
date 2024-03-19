import { useRouter } from 'next/router';

import React from 'react';

interface IDefaultPaging {
  page: number;
  pageSize: number;
  sortField: string;
  orderType: 'asc' | 'desc';
}

type IQueryParams = {
  page: string;
  pageSize: string;
  sortField: string;
  orderType: string;
  title?: string;
};
export const DefaultPaging: IDefaultPaging = {
  page: 0,
  pageSize: 25,
  sortField: 'id',
  orderType: 'desc'
};

export const useQueryParams = () => {
  const query = useRouter().query as any as IQueryParams;
  const page = parseInt(query.page ?? DefaultPaging.page.toString(), 10);
  const pageSize = parseInt(query.pageSize ?? DefaultPaging.pageSize.toString(), 10);
  const sortField = query.sortField ?? DefaultPaging.sortField;
  const orderType = query.orderType ?? DefaultPaging.orderType;
  const title = query.title ?? '';

  return React.useMemo(
    () => ({
      page,
      pageSize,
      sortField,
      orderType: orderType,
      title
    }),
    [page, pageSize, sortField, orderType, title]
  );
};
