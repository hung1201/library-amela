import { Box, useTheme } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { useAuthorList } from '../../api';
import { Order } from '../../components/Datatable/configuration';
import PageContent from '../../components/PageContent';
import { DefaultPaging, useQueryParams } from './common';
import AddEditAuthorModal from './components/AddEditAuthorModal';
import AuthorList from './components/AuthorList';
type Props = {};

const Author = (props: Props) => {
  const theme = useTheme();
  const { data, isLoading } = useAuthorList({});
  const query = useQueryParams();
  const sortField = React.useRef<string>(query.sortField);
  const sortType = React.useRef<Order>(query.orderType as string as Order);
  const router = useRouter();
  const paging = {
    page: query.page ?? DefaultPaging.page,
    pageSize: query.pageSize ?? DefaultPaging.pageSize,
    total: data?.paging?.total || 0
  };
  return (
    <PageContent>
      <AddEditAuthorModal />
      <Box
        className="pt-10 md:pt-32 pb-20 md:pb-44 px-5 md:px-12 lg:px-20"
        display={'flex'}
        sx={{
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <AuthorList />
      </Box>
    </PageContent>
  );
};

export default Author;
