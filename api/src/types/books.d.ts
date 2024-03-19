export interface IBookModels {
  id: number;
  title: string;
  pubYear: string;
  authorId: string;
}
export interface IInsertBookInput {
  title: string;
  pubYear: string;
  authorId: number;
}
export interface IFetchBookListInput {
  sortField?: string;
  order?: 'asc' | 'desc';
  page?: string;
  pageSize?: string;
}
export interface IFetchBookListOutput {
  books: Array<IBookModels & { author: string }>;
  paging: {
    total: number;
    page: number;
    pageSize: number;
  };
}
