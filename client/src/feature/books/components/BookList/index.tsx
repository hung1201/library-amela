import { Box, Button, IconButton, Tooltip, Typography, useTheme } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import moment from 'moment';
import { useRouter } from 'next/router';
import React from 'react';
import { useBookList } from '../../../../api';
import Datatable from '../../../../components/Datatable';
import { Order } from '../../../../components/Datatable/configuration';
import { ModalIDs } from '../../../../config/modalsConfig';
import { useModalAction } from '../../../../services/ModalProvider';
import { IBookModels } from '../../../../types/books.types';
import { DefaultPaging, useQueryParams } from '../../common';
import RoutesConfig from '../../../../config/routesConfig';
import NavService from '../../../../services/Nav.service';
import { cleanObject } from '../../../../utils/object';
import { useDeleteBook } from '../../api';

type Props = {};

const BookList = (props: Props) => {
  const { open } = useModalAction();
  const theme = useTheme();
  const { data, isLoading } = useBookList({});
  const query = useQueryParams();
  const sortField = React.useRef<string>(query.sortField);
  const sortType = React.useRef<Order>(query.orderType as string as Order);
  const nav = new NavService();
  const paging = {
    page: query.page ?? DefaultPaging.page,
    pageSize: query.pageSize ?? DefaultPaging.pageSize,
    total: data?.paging?.total || 0
  };
  return (
    <Datatable
      loading={isLoading}
      sorting={{
        sortField: sortField.current,
        order: sortType.current
      }}
      paging={paging}
      fullHeight
      disablePaper
      data={data?.books ?? []}
      tableCellMainRowProps={() => ({
        sx: {
          background: `${theme.palette.primary.light} !important`,
          color: theme.palette.primary.dark,
          fontWeight: 700
        },
        filterStyle: {
          background: theme?.palette?.background?.paper
        }
      })}
      columns={[
        {
          label: 'Title',
          id: 'title',
          render(rowIndex, cellValue, columnIndex, data) {
            return <Box>{cellValue}</Box>;
          },
          inData: true
        },
        {
          label: 'Publication Year',
          id: 'pubYear',
          render(rowIndex, cellValue, columnIndex, data) {
            return <Box>{moment(cellValue).format('DD-MM-YYYY')}</Box>;
          },
          inData: true
        },
        {
          label: 'Author',
          id: 'author',
          render(rowIndex, cellValue, columnIndex, data) {
            return <Box>{cellValue}</Box>;
          },
          inData: true
        },
        {
          label: '',
          id: 'actions',
          render: (rowIndex, cellValue, columnIndex, data) => (
            <Actions data={data} rowIndex={rowIndex} />
          ),
          inData: false
        }
      ]}
      title={({ handleFiltering, globalSearchTextInput, filtersIsEnabled, handleReset }) => (
        <div>
          <div className="flex justify-between items-center w-full py-2">
            <span style={{ fontWeight: 700 }}>Books</span>
            <div className="flex items-center gap-5">
              <Button
                startIcon={<AddIcon />}
                variant="contained"
                color="primary"
                style={{
                  borderRadius: '8px',
                  boxShadow: 'none',
                  textTransform: 'none'
                }}
                onClick={() => open(ModalIDs.ADD_EDIT_BOOK_MODAL, {})}
              >
                <Typography>Create</Typography>
              </Button>
            </div>
          </div>
        </div>
      )}
      resetFilteringAction={() => {
        nav.redirectUser(
          RoutesConfig.BookPage.path({
            page: query.page ?? DefaultPaging.page,
            pageSize: query.pageSize ?? DefaultPaging.pageSize,
            sortField: query.sortField ?? DefaultPaging.sortField,
            orderType: query.orderType ?? DefaultPaging.orderType
          })
        );
      }}
      handleDataChange={(
        selectedPage,
        pageSize,
        previousOrder,
        _sortField,
        newOrder,
        filteringData
      ) => {
        sortType.current = newOrder;
        sortField.current = _sortField;

        nav.redirectUser(
          RoutesConfig.BookPage.path({
            ...query,
            ...cleanObject({
              page: selectedPage,
              pageSize,
              sortField: _sortField,
              orderType: previousOrder as any,
              search: filteringData.__globalValue
            })
          })
        );
      }}
    />
  );
};
interface IActionProps {
  data: IBookModels[];
  rowIndex: number;
}

const Actions = React.memo(({ data, rowIndex }: IActionProps) => {
  const { open } = useModalAction();
  const { refetch } = useBookList({
    enabled: false
  });
  const { mutate: deleteBook } = useDeleteBook({
    onSuccess() {
      refetch();
    }
  });

  return (
    <Box display="flex">
      <Tooltip title="Edit">
        <IconButton
          size="small"
          onClick={() => open(ModalIDs.ADD_EDIT_BOOK_MODAL, { data: data[rowIndex] })}
        >
          <EditOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Remove">
        <IconButton
          size="small"
          onClick={() => {
            open(ModalIDs.MODAL_VERIFY_ACTION, {
              title: 'Remove Book',
              entityName: `${data[rowIndex].id}`,
              action1Event: () => {
                deleteBook({
                  id: data[rowIndex].id
                });
              }
            });
          }}
        >
          <DeleteForeverOutlinedIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
});

Actions.displayName = 'Actions';
export default BookList;
