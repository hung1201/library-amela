import _ from 'lodash';
import { IBookModels, IFetchBookListInput, IFetchBookListOutput } from '../../types/books.types';
import FetchService from '../Fetch.service';
import { varToStringParams } from '../../utils/path';

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
  return data;
};

export const addBook = async (payload: Omit<IBookModels, 'id'>): Promise<any> => {
  const data = await FetchService.isofetch('/books/add', payload, 'POST');
  return data;
};
export const deleteBook = async (payload: { id: number }): Promise<any> => {
  const data = await FetchService.isofetch(`/books/details/${payload.id}`, payload, 'DELETE');
  return data;
};
