import { IProps } from './configuration';
import DefaultTemplate from './templates/Default';
export type { IProps as IDatatableProps };

const Datatable = <T extends {}>(props: IProps<T>) => {
  return <DefaultTemplate {...props} />;
};

export default Datatable;
