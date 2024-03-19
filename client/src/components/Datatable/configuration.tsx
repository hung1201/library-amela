import {
  BoxProps,
  TableCellProps,
  TablePaginationProps,
  TableSortLabelProps,
  TextFieldProps
} from '@material-ui/core';
import React, { ReactElement } from 'react';

export type AlignType = 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined;

export type FilteringType =
  | 'datetime'
  | 'date'
  | 'date-range'
  | 'time'
  | 'text'
  | 'dropdown'
  | 'multiple-select'
  | 'number'
  | 'number-range'
  | 'checkbox'
  | 'auto-complete-text';

export type DropdownOptionsType = Array<{
  id: string | number;
  label: string | React.ReactElement;
}>;

export interface IDateRange {
  start?: string;
  end?: string;
}
export interface INumberRange {
  rangeValue?: number;
  rangeOperator?: string;
}

export type IFilteringFieldsStateData =
  | number
  | string
  | boolean
  | IDateRange
  | undefined
  | INumberRange
  | null;

interface IPaging {
  page: number;
  pageSize: number;
  total: number;
}

export interface IColumnProps<T = any> {
  label: any;
  id: string;
  minWidth?: number;
  align?: AlignType | string;
  inData: boolean;
  filtering?: {
    type: FilteringType;
    options?: DropdownOptionsType;
    defaultValue?: IFilteringFieldsStateData;
    placeholder?: string;
  };
  renderListItem?: (
    rowIndex: number,
    cellValue: React.ReactNode,
    columnIndex: number,
    data: T
  ) => ReactElement;
  render: (rowIndex: number, cellValue: any, columnIndex: number, data: T) => ReactElement;
  sticky?: 'left' | 'right';
}

export type Order = 'asc' | 'desc';
export interface ISorting {
  sortField: string;
  order: Order;
}

export interface IProps<T> {
  data: T[];
  columns: IColumnProps<T[]>[];
  disablePadding?: boolean;
  stickyHeader?: boolean;
  loading?: boolean;
  minHeight?: number | string;
  fullHeight?: boolean;
  paging?: IPaging | undefined;
  sorting?: ISorting;
  paperProps?: BoxProps;
  disablePaper?: boolean;
  title?:
    | React.ReactNode
    | ((options: {
        handleFiltering: () => void;
        globalSearchTextInput: (props: Partial<TextFieldProps>) => React.ReactNode;
        isList: boolean;
        handleReset?: () => void;
        filtersIsEnabled: boolean;
      }) => React.ReactNode);
  filtering?: {
    searchFields?: boolean;
    globalSearchPlaceholder?: string;
    globalSearchDefaultValue?: string;
    visible?: boolean;
  };
  tableCellMainRowProps?: (columnIndex: number) => TableCellProps & { filterStyle?: {} };
  renderCollapseTableRow?: {
    direction: 'left' | 'right';
    render: (rowElement: T) => React.ReactNode;
  };
  sortLabelProps?: (isActive: boolean) => TableSortLabelProps;
  tableCellProps?: (columnIndex: number, rowIndex: number, cellValue: any) => TableCellProps;

  handleDataChange?: (
    selectedPage: number,
    pageSize: number,
    oldOrder: Order,
    sortField: string,
    newOrder: Order,
    filtering: IFilteringData
  ) => void;
  renderItemInSmallDevices?: (data: T, index: number, list: T[]) => React.ReactNode;
  resetFilteringAction?: () => void;
  onRowClick?: (element: T) => void;
  paginationProps?: TablePaginationProps;
  nestedScroll?: boolean;
}

export interface IFilteringData {
  __globalValue?: null | any;
  [key: string]: any;
}
