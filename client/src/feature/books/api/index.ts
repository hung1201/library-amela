import { useMutation } from 'react-query';
import * as BookService from '../../../services/books';

export const useEditBook = (options: { onSuccess?: () => void; enabled?: boolean }) => {
  return useMutation(BookService.editBook, {
    onSuccess: options.onSuccess,
    onError: () => {}
  });
};
export const useAddBook = (options: { onSuccess?: () => void; enabled?: boolean }) => {
  return useMutation(BookService.addBook, {
    onSuccess: options.onSuccess,
    onError: () => {}
  });
};

export const useDeleteBook = (options: { onSuccess?: () => void; enabled?: boolean }) => {
  return useMutation(BookService.deleteBook, {
    onSuccess: options.onSuccess,
    onError: () => {}
  });
};
