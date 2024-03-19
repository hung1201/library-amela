import { useQuery } from 'react-query';
import * as BookService from '../services/books';
import * as AuthorService from '../services/authors';
import { IFetchBookListInput } from '../types/books.types';
import { useQueryParams } from '../feature/books/common';
import { IFetchAuthorListInput } from '../types/authors.types';

export const useBookList = (options: {
  onSuccess?: () => void;
  enabled?: boolean;
  filtering?: IFetchBookListInput;
}) => {
  const query = useQueryParams();
  const { enabled = true } = options;
  const filtering: IFetchBookListInput = {
    page: options?.filtering?.page ?? query.page.toString(),
    pageSize: options?.filtering?.pageSize ?? query.pageSize.toString(),
    order: query.orderType as 'asc' | 'desc',
    sortField: query.sortField
  };
  return useQuery(
    ['fetchBooks', ...Object.values(filtering)],
    () => BookService.fetchBooksList({ ...filtering }),
    {
      onSuccess: options.onSuccess,
      enabled: enabled,
      keepPreviousData: true
    }
  );
};

export const useAuthorList = (options: {
  onSuccess?: () => void;
  enabled?: boolean;
  filtering?: IFetchAuthorListInput;
}) => {
  const query = useQueryParams();
  const { enabled = true } = options;
  const filtering: IFetchAuthorListInput = {
    page: options?.filtering?.page ?? query.page.toString(),
    pageSize: options?.filtering?.pageSize ?? query.pageSize.toString(),
    order: query.orderType as 'asc' | 'desc',
    sortField: query.sortField
  };
  return useQuery(
    ['fetchAuthors', ...Object.values(filtering)],
    () => AuthorService.fetchAuthorsList({ ...filtering }),
    {
      onSuccess: options.onSuccess,
      enabled: options.enabled
    }
  );
};
