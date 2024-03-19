import { useMutation } from 'react-query';
import * as AuthorService from '../../../services/authors';

export const useEditAuthor = (options: { onSuccess?: () => void; enabled?: boolean }) => {
  return useMutation(AuthorService.editAuthor, {
    onSuccess: options.onSuccess,
    onError: () => {}
  });
};
export const useAddAuthor = (options: { onSuccess?: () => void; enabled?: boolean }) => {
  return useMutation(AuthorService.addAuthor, {
    onSuccess: options.onSuccess,
    onError: () => {}
  });
};

export const useDeleteAuthor = (options: { onSuccess?: () => void; enabled?: boolean }) => {
  return useMutation(AuthorService.deleteAuthor, {
    onSuccess: options.onSuccess,
    onError: () => {}
  });
};
