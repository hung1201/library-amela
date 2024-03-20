import _ from 'lodash';
import { IBookModels, IFetchBookListInput, IFetchBookListOutput } from '../../types/books.types';
import FetchService from '../Fetch.service';
import { varToStringParams } from '../../utils/path';
import { notistack } from '../../utils/notistack';

export const fetchBooksList = async (
  payload: IFetchBookListInput
): Promise<IFetchBookListOutput> => {
  const data = (await FetchService.isofetch(
    `/books/list${varToStringParams({
      variablesArray: Object.keys(payload ?? {}).map((key) => ({
        key: key,
        value: _.get(payload, key)
      }))
    })}`,
    {},
    'POST'
  )) as IFetchBookListOutput;
  return {
    books: data.books,
    paging: data.paging
  };
};

export const editBook = async (payload: {
  id: number;
  body: Omit<IBookModels, 'id'>;
}): Promise<any> => {
  const data = await FetchService.isofetch(`/books/details/${payload.id}`, payload.body, 'PATCH');
  if (data.success) {
    notistack.success('Book updated successfully');
  }
  return data;
};

export const addBook = async (payload: Omit<IBookModels, 'id'>): Promise<any> => {
  const data = await FetchService.isofetch('/books/add', payload, 'POST');
  if (data.success) {
    notistack.success('Book added successfully');
  }
  return data;
};
export const deleteBook = async (payload: { id: number }): Promise<any> => {
  const data = await FetchService.isofetch(`/books/details/${payload.id}`, payload, 'DELETE');
  notistack.success('Book deleted successfully');
  return data;
};
