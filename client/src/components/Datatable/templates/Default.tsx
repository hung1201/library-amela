import { ReactElement } from 'react';
import { IProps } from '../configuration';
import DatatableTemplate from './Template';

export type { IProps as IDatatableProps };

export default function Datatable<T>(props: IProps<T>): ReactElement {
  return <DatatableTemplate {...props} />;
}
