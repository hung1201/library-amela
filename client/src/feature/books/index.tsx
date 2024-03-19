import { Box, useTheme } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { useBookList } from '../../api';
import { Order } from '../../components/Datatable/configuration';
import PageContent from '../../components/PageContent';
import { DefaultPaging, useQueryParams } from './common';
import AddEditBookModal from './components/AddEditBookModal';
import BookList from './components/BookList';
type Props = {};

const Book = (props: Props) => {
  const theme = useTheme();
  const { data, isLoading } = useBookList({});
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
      <AddEditBookModal />
      <Box
        className="pt-10 md:pt-32 pb-20 md:pb-44 px-5 md:px-12 lg:px-20"
        display={'flex'}
        sx={{
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <BookList />
      </Box>
    </PageContent>
  );
};

export default Book;
