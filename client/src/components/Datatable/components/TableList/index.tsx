import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons//KeyboardArrowUp';
import _ from 'lodash';
import React, { ReactElement } from 'react';
import { IFilteringData, IProps, Order } from '../../configuration';
import LoadingView from '../LoadingView';
import TableTitleContainer from '../TableTitleContainer';
import useStyles from './styles';
import {
  Box,
  Collapse,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  colors,
  useTheme
} from '@material-ui/core';

interface ITableProps<T> extends IProps<T> {
  orderBy: string;
  page: number;
  order: Order;
  rowsPerPage: number;
  filteringData: {
    current: IFilteringData;
  };
  handleFiltering: (resetForm: boolean) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePage: (event: unknown, newPage: number) => void;
  createSortHandler: (
    property: string,
    inData: boolean
  ) => (event: React.MouseEvent<unknown>) => void;
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

export default function AppTable<T>(props: ITableProps<T>): ReactElement {
  const classes = useStyles();
  const theme = useTheme();
  const {
    page,
    rowsPerPage,
    handleChangeRowsPerPage,
    handleChangePage,
    createSortHandler,
    handleFiltering,
    loading,
    tableCellMainRowProps,
    tableCellProps,
    paperProps = {},
    filteringData,
    fullHeight,
    disablePaper = false,
    onRowClick,
    stickyHeader = true,
    sortLabelProps,
    templateOverrides
  } = props;
  return (
    <PaperContainer
      disablePaper={disablePaper}
      {...paperProps}
      style={{
        ...(fullHeight
          ? {
              display: 'flex',
              flexDirection: 'column',
              flex: 1,

              // for testing...
              position: 'relative'
              // for testing...
            }
          : undefined)
      }}
    >
      <Box
        sx={{
          ...(fullHeight
            ? {
                // for testing...
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                position: stickyHeader ? 'absolute' : undefined,
                width: '100%',
                height: '100%'
                // for testing...
              }
            : {})
        }}
      >
        {(props.title || props.filtering) && (
          <TableTitleContainer
            filteringData={filteringData}
            title={props.title}
            filteringPlaceholder={props.filtering?.globalSearchPlaceholder}
            handleFiltering={handleFiltering}
            globalSearchDefaultValue={props?.filtering?.globalSearchDefaultValue}
            resetFilteringAction={props.resetFilteringAction}
            isList={false}
          />
        )}
        <TableContainer
          style={{
            minHeight: props?.minHeight || undefined,
            justifyContent: 'space-between',
            display: 'flex',
            flexDirection: 'column',
            ...(fullHeight
              ? {
                  flex: 1
                }
              : {}),
            overflow: loading ? 'hidden' : undefined,

            // borders
            borderRadius: 2,
            borderStyle: 'solid',
            borderWidth: 1.3,
            borderColor: colors.grey['300'],
            ...(templateOverrides?.tableContainer ? { ...templateOverrides?.tableContainer } : {})
          }}
        >
          <Box
            className="table-scrollbar"
            style={{
              background: theme.palette.background.paper,
              overflow: 'inherit',
              ...(fullHeight
                ? {
                    flex: 1
                  }
                : {})
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {props.renderCollapseTableRow?.direction === 'left' && (
                    <TableCell
                      {...(tableCellMainRowProps ? tableCellMainRowProps(-1) : {})}
                      style={{
                        margin: 0,
                        padding: 0
                      }}
                    />
                  )}
                  {props.columns.map((headCell, index) => {
                    const labelWithBox = (
                      <Box
                        style={{
                          visibility: headCell.label ? undefined : 'hidden'
                        }}
                        marginX={1}
                        sx={{
                          whiteSpace: 'nowrap',
                          ...(templateOverrides ? { marginY: '8px' } : {})
                        }}
                      >
                        {headCell.label || 'empty'}
                      </Box>
                    );

                    const cellProps = tableCellMainRowProps ? tableCellMainRowProps(index) : {};

                    return (
                      <TableCell
                        key={index}
                        {...cellProps}
                        style={{
                          ...cellProps.style,
                          minWidth: headCell.minWidth,
                          margin: 0,
                          padding: 0,
                          top: 0,
                          color: templateOverrides
                            ? theme.palette.text.primary
                            : theme.palette.primary.dark,
                          ...(stickyHeader
                            ? headCell.sticky === 'right'
                              ? { zIndex: 5 }
                              : headCell.sticky === 'left'
                              ? { zIndex: 5 }
                              : undefined
                            : undefined),
                          paddingLeft: '16px'
                        }}
                        align={
                          headCell.align === 'right'
                            ? 'right'
                            : headCell.align === 'center'
                            ? 'center'
                            : 'left'
                        }
                        className={
                          stickyHeader
                            ? headCell.sticky === 'right'
                              ? classes.stickyRight
                              : headCell.sticky === 'left'
                              ? classes.stickyLeft
                              : undefined
                            : undefined
                        }
                        padding={props.disablePadding ? 'none' : 'normal'}
                        sortDirection={props.orderBy === headCell.id ? props.order : false}
                      >
                        {props.sorting ? (
                          <TableSortLabel
                            active={props.orderBy === headCell.id}
                            direction={props.orderBy === headCell.id ? props.order : 'asc'}
                            disabled={!headCell.inData}
                            onClick={createSortHandler(headCell.id, headCell.inData)}
                            style={{
                              marginBottom: '12px',
                              marginTop: '12px'
                            }}
                            {...(sortLabelProps
                              ? sortLabelProps(props.orderBy === headCell.id)
                              : undefined)}
                          >
                            {labelWithBox}
                            {props.orderBy === headCell.id ? (
                              <span
                                style={{
                                  border: 0,
                                  clip: 'rect(0 0 0 0)',
                                  height: 1,
                                  margin: -1,
                                  overflow: 'hidden',
                                  padding: 0,
                                  position: 'absolute',
                                  top: 20,
                                  width: 1
                                }}
                              >
                                {props.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                              </span>
                            ) : null}
                          </TableSortLabel>
                        ) : (
                          labelWithBox
                        )}
                      </TableCell>
                    );
                  })}
                  {props.renderCollapseTableRow?.direction === 'right' && (
                    <TableCell
                      {...(tableCellMainRowProps
                        ? tableCellMainRowProps(props.columns.length + 1)
                        : {})}
                      style={{
                        margin: 0,
                        padding: 0
                      }}
                    />
                  )}
                </TableRow>
              </TableHead>

              {!loading && (
                <TableBody>
                  {props.data.map((row, rowIndex) => {
                    return (
                      <ItemRow
                        key={rowIndex}
                        rowIndex={rowIndex}
                        columns={props.columns}
                        data={props.data}
                        tableCellProps={tableCellProps}
                        onRowClick={onRowClick}
                        row={row}
                        renderCollapseTableRow={props.renderCollapseTableRow}
                        disablePadding={props.disablePadding}
                      />
                    );
                  })}
                </TableBody>
              )}
            </Table>
            {loading && (
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Box>
                  <LoadingView />
                </Box>
              </Box>
            )}
          </Box>

          {props.paging && (
            <Box
              style={{ background: theme.palette.background.paper, position: 'sticky', left: 0 }}
            >
              <Divider />
              <TablePagination
                rowsPerPageOptions={[10, 25, 100, 200]}
                component="div"
                count={props.paging?.total || props.data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          )}
        </TableContainer>
      </Box>
    </PaperContainer>
  );
}

interface IItemRow<T> {
  rowIndex: number;
  columns: ITableProps<T>['columns'];
  data: ITableProps<T>['data'];
  tableCellProps: ITableProps<T>['tableCellProps'];
  onRowClick: ITableProps<T>['onRowClick'];
  row: ITableProps<T>['data'][0];
  renderCollapseTableRow: ITableProps<T>['renderCollapseTableRow'];
  disablePadding: ITableProps<T>['disablePadding'];
}

function ItemRow<T>({
  rowIndex,
  row,
  onRowClick,
  tableCellProps,
  columns,
  data,
  renderCollapseTableRow,
  disablePadding
}: IItemRow<T>) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const arrowExpand = (
    <TableCell>
      <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>
    </TableCell>
  );

  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
        {renderCollapseTableRow?.direction === 'left' && arrowExpand}
        {columns.map((column, columnIndex) => {
          const value = _.get(row, column.id, null);
          return (
            <TableCell
              key={columnIndex}
              onClick={() => onRowClick && onRowClick(row)}
              padding={disablePadding ? 'none' : 'normal'}
              className={
                column.sticky === 'right'
                  ? classes.stickyRight
                  : column.sticky === 'left'
                  ? classes.stickyLeft
                  : undefined
              }
              align={
                column.align === 'right' ? 'right' : column.align === 'center' ? 'center' : 'left'
              }
              {...(tableCellProps ? tableCellProps(columnIndex, rowIndex, value) : {})}
            >
              {column.render(rowIndex, value, columnIndex, data)}
            </TableCell>
          );
        })}
        {renderCollapseTableRow?.direction === 'right' && arrowExpand}
      </TableRow>
      {renderCollapseTableRow && (
        <TableRow key={rowIndex}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns.length + 1}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {renderCollapseTableRow.render(data[rowIndex])}
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

interface IPaperProps {
  disablePaper: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const PaperContainer = (props: IPaperProps) => {
  const { disablePaper, children, ...paperProps } = props;

  return (
    <>
      {!disablePaper ? (
        <Paper
          elevation={0}
          variant="outlined"
          square
          {...paperProps}
          style={{
            width: '100%',
            height: '100%',
            ...paperProps.style
          }}
        >
          {props.children}
        </Paper>
      ) : (
        <Box
          {...paperProps}
          style={{
            width: '100%',
            height: '100%',
            ...paperProps.style
          }}
        >
          {props.children}
        </Box>
      )}
    </>
  );
};
