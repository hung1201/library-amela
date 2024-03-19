import { IBookModels } from './books.types';

export interface IAuthorModels {
  id: number;
  name: string;
  bookIds: number[];
}
export interface IInsertAuthorInput {
  name: string;
  bookIds: number[];
}
export interface IFetchAuthorListInput {
  sortField?: string;
  order?: 'asc' | 'desc';
  page?: string;
  pageSize?: string;
}
export interface IFetchAuthorListOutput {
  authors: Array<IAuthorModels & { books: Pick<IBookModels, 'id' | 'title'>[] }>;
  paging: {
    total: number;
    page: number;
    pageSize: number;
  };
}
