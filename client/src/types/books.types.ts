export interface IFetchBookListInput {
  sortField?: string;
  order?: 'asc' | 'desc';
  page?: string;
  pageSize?: string;
}
export interface IBookModels {
  id: number;
  title: string;
  pubYear: string;
  authorId: string;
}
export interface IFetchBookListOutput {
  books: Array<IBookModels & { author: string }>;
  paging: {
    total: number;
  };
}
