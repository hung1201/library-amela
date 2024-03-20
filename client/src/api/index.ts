import { useMutation, useQuery } from 'react-query';
import * as BookService from '../services/books';
import * as AuthorService from '../services/authors';
import * as AuthService from '../services/auth';
import { IFetchBookListInput } from '../types/books.types';
import { useQueryParams } from '../feature/books/common';
import { IFetchAuthorListInput } from '../types/authors.types';
import { ILoginOutput } from '../types/auth.types';
import { notistack } from '../utils/notistack';

export const useBookList = (options: {
  onSuccess?: () => void;
  enabled?: boolean;
  filtering?: IFetchBookListInput;
  isAuthored?: boolean;
}) => {
  const query = useQueryParams();
  const { enabled = true } = options;
  const filtering: IFetchBookListInput = {
    page: options?.filtering?.page ?? query.page.toString(),
    pageSize: options?.filtering?.pageSize ?? query.pageSize.toString(),
    order: options?.filtering?.order ?? (query.orderType as 'asc' | 'desc'),
    sortField: options?.filtering?.sortField ?? query.sortField,
    title: query.title,
    isAuthored: options.isAuthored ? String(options.isAuthored) : undefined
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

export const useRegisterUser = (options: { onSuccess?: (data) => void; enabled?: boolean }) => {
  return useMutation(AuthService.registerUser, {
    onSuccess: options.onSuccess,
    onError: () => {}
  });
};
export const useLoginUser = (options: {
  onSuccess?: (data: ILoginOutput) => void;
  enabled?: boolean;
}) => {
  return useMutation(AuthService.loginUser, {
    onSuccess: options.onSuccess,
    onError: () => {}
  });
};

export const useForgotPassword = (options: { onSuccess?: (data) => void; enabled?: boolean }) => {
  return useMutation(AuthService.forgotPassword, {
    onSuccess: options.onSuccess,
    onError: () => {}
  });
};

export const useResetPassword = (options: { onSuccess?: (data) => void; enabled?: boolean }) => {
  return useMutation(AuthService.resetPassword, {
    onSuccess: options.onSuccess,
    onError: () => {}
  });
};
