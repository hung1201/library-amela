import { Box, Button, Chip, IconButton, Tooltip, Typography, useTheme } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import moment from 'moment';
import React from 'react';
import { useAuthorList } from '../../../../api';
import Datatable from '../../../../components/Datatable';
import { Order } from '../../../../components/Datatable/configuration';
import { ModalIDs } from '../../../../config/modalsConfig';
import RoutesConfig from '../../../../config/routesConfig';
import { useModalAction } from '../../../../services/ModalProvider';
import NavService from '../../../../services/Nav.service';
import { IAuthorModels } from '../../../../types/authors.types';
import { cleanObject } from '../../../../utils/object';
import { useDeleteAuthor } from '../../api';
import { DefaultPaging, useQueryParams } from '../../common';

type Props = {};

const AuthorList = (props: Props) => {
  const { open } = useModalAction();
  const theme = useTheme();
  const { data, isLoading } = useAuthorList({});
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
      data={data?.authors ?? []}
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
          label: 'Name',
          id: 'name',
          render(rowIndex, cellValue, columnIndex, data) {
            return <Box>{cellValue}</Box>;
          },
          inData: true
        },
        {
          label: 'Book',
          id: 'books',
          render(rowIndex, cellValue, columnIndex, data) {
            return (
              <Box display={'flex'} flexWrap={'wrap'} style={{ gap: 4 }}>
                {data[rowIndex].books
                  .filter((item) => item.id)
                  .map((item) => (
                    <Chip key={item.id} label={item.title} />
                  ))}
              </Box>
            );
          },
          inData: false
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
            <span style={{ fontWeight: 700 }}>Authors</span>
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
                onClick={() => open(ModalIDs.ADD_EDIT_AUTHOR_MODAL, {})}
              >
                <Typography>Create</Typography>
              </Button>
            </div>
          </div>
        </div>
      )}
      resetFilteringAction={() => {
        nav.redirectUser(
          RoutesConfig.AuthorPage.path({
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
          RoutesConfig.AuthorPage.path({
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
  data: IAuthorModels[];
  rowIndex: number;
}

const Actions = React.memo(({ data, rowIndex }: IActionProps) => {
  const { open } = useModalAction();
  const { refetch } = useAuthorList({
    enabled: false
  });
  const { mutate: deleteAuthor } = useDeleteAuthor({
    onSuccess() {
      refetch();
    }
  });

  return (
    <Box display="flex">
      <Tooltip title="Edit">
        <IconButton
          size="small"
          onClick={() => open(ModalIDs.ADD_EDIT_AUTHOR_MODAL, { data: data[rowIndex] })}
        >
          <EditOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Remove">
        <IconButton
          size="small"
          onClick={() => {
            open(ModalIDs.MODAL_VERIFY_ACTION, {
              title: 'Remove Author',
              entityName: `${data[rowIndex].id}`,
              action1Event: () => {
                deleteAuthor({
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
export default AuthorList;
