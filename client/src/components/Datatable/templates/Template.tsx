import _ from 'lodash';
import React, { ReactElement } from 'react';
import MobileList from '../components/MobileList';
import AppTable from '../components/TableList';
import { IFilteringData, IProps, Order } from '../configuration';
import { DatatableProvider } from '../provider';
import { isEmpty } from '../utils';
import { Box } from '@material-ui/core';

export type { IProps as IDatatableProps };
export interface ITemplateProps<T> extends IProps<T> {
  templateOverrides?: {
    tableContainer?: {
      [key: string]: string;
    };
    table?: {
      [key: string]: string;
    };
    tableHeader?: {
      [key: string]: string;
    };
  };
}
export default function DatatableTemplate<T>(props: ITemplateProps<T>): ReactElement {
  let page = props.paging?.page || 0;
  let rowsPerPage = props.paging?.pageSize || 10;
  const sortType = React.useRef<Order | undefined>(props.sorting?.order);
  const sortField = React.useRef<string | undefined>(props.sorting?.sortField);
  const filteringData = React.useRef<IFilteringData>({});
  const handleChangePage = (event: unknown, newPage: number) => {
    if (props.handleDataChange) {
      const order = sortType.current || 'asc';
      props.handleDataChange(
        newPage,
        rowsPerPage,
        order,
        props.sorting?.sortField || '',
        order,
        filteringData.current
      );
    }
  };

  const handleFiltering = React.useCallback(
    (resetForm: boolean) => {
      const order = sortType.current || 'asc';
      if (props.handleDataChange) {
        props.handleDataChange(
          page,
          rowsPerPage,
          order,
          sortField.current || '',
          order,
          filteringData.current
        );
      }
    },
    [page, props, rowsPerPage]
  );

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string //keyof IData
  ) => {
    if (props.handleDataChange) {
      if (sortField.current !== property) {
        sortType.current = 'asc';
      } else {
        sortType.current = sortType.current === 'asc' ? 'desc' : 'asc';
      }
      sortField.current = property;
      props.handleDataChange(
        page,
        rowsPerPage,
        sortType.current,
        property,
        sortType.current,
        filteringData.current
      );
    }
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.handleDataChange && props.paging) {
      const order = sortType.current || 'asc';

      props.handleDataChange(
        props.paging.page,
        +event.target.value,
        order,
        props.sorting?.sortField || '',
        order,
        filteringData.current
      );
    }
  };

  // keyof Data
  const createSortHandler =
    (property: string, inData: boolean) => (event: React.MouseEvent<unknown>) => {
      if (inData) {
        handleRequestSort(event, property);
      }
    };
  const TableDataElement = (
    <AppTable
      {...props}
      filteringData={filteringData}
      createSortHandler={createSortHandler}
      handleChangePage={handleChangePage}
      order={sortType.current || ('asc' as any)}
      rowsPerPage={rowsPerPage}
      handleFiltering={handleFiltering}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      orderBy={props.sorting?.sortField || ''}
      page={page}
      templateOverrides={props.templateOverrides!}
    />
  );

  const filteringIsVisible = (() => {
    // !!current.filtering?.defaultValue,
    const result = props.columns.reduce(
      (previous, current) => previous || !isEmpty(current.filtering?.defaultValue),
      false
    );

    return !_.isUndefined(props.filtering?.visible) ? Boolean(props.filtering?.visible) : result;
  })();

  return (
    <DatatableProvider filteringIsVisible={filteringIsVisible}>
      <>
        {props.renderItemInSmallDevices ? (
          <>
            <Box
              sx={{
                display: { sm: 'block', xs: 'none', flex: 1, height: '100%' }
              }}
            >
              {TableDataElement}
            </Box>
            <Box sx={{ display: { sm: 'none', xs: 'block', flex: 1 } }}>
              {/* hidden up to small */}
              <MobileList
                {...props}
                filteringData={filteringData}
                createSortHandler={createSortHandler}
                handleChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                handleFiltering={handleFiltering}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                orderBy={props.sorting?.sortField || ''}
                page={page}
              />
            </Box>
          </>
        ) : (
          TableDataElement
        )}
      </>
    </DatatableProvider>
  );
}
