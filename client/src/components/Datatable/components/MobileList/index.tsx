import React, { ReactElement } from 'react';
import { IFilteringData, IProps } from '../../configuration';
import FilteringModal from '../FilteringModal';
import LoadingView from '../LoadingView';
import TableTitleContainer from '../TableTitleContainer';
import { Box, TablePagination } from '@material-ui/core';

interface ITableProps<T> extends IProps<T> {
  orderBy: string;
  page: number;
  rowsPerPage: number;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePage: (event: unknown, newPage: number) => void;
  filteringData: {
    current: IFilteringData;
  };
  handleFiltering: (resetForm: boolean) => void;
  createSortHandler: (
    property: string,
    inData: boolean
  ) => (event: React.MouseEvent<unknown>) => void;
}

export default function MobileList<T>(props: ITableProps<T>): ReactElement {
  const {
    page,
    rowsPerPage,
    handleChangeRowsPerPage,
    handleChangePage,
    filteringData,
    renderItemInSmallDevices,
    handleFiltering,
    columns,
    resetFilteringAction,
    loading
  } = props;

  return (
    <>
      <FilteringModal
        filteringData={filteringData}
        handleFiltering={handleFiltering}
        columns={columns}
        resetFilteringAction={resetFilteringAction}
      />

      {(props.title || props.filtering) && (
        <TableTitleContainer
          filteringData={filteringData}
          title={props.title}
          filteringPlaceholder={props.filtering?.globalSearchPlaceholder}
          handleFiltering={handleFiltering}
          globalSearchDefaultValue={props.filtering?.globalSearchDefaultValue}
          isList
          resetFilteringAction={props.resetFilteringAction}
        />
      )}

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {loading && (
          <Box sx={{ marginX: 'auto', padding: 5 }}>
            <LoadingView />
          </Box>
        )}
      </Box>

      {props.paging && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100, 200]}
          component="div"
          count={props.paging?.total || props.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </>
  );
}
