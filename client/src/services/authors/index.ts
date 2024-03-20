import _ from 'lodash';
import {
  IAuthorModels,
  IFetchAuthorListInput,
  IFetchAuthorListOutput
} from '../../types/authors.types';
import FetchService from '../Fetch.service';
import { varToStringParams } from '../../utils/path';
import { notistack } from '../../utils/notistack';

export const fetchAuthorsList = async (
  payload: IFetchAuthorListInput
): Promise<IFetchAuthorListOutput> => {
  const data = (await FetchService.isofetch(
    `/authors/list${varToStringParams({
      variablesArray: Object.keys(payload ?? {}).map((key) => ({
        key: key,
        value: _.get(payload, key)
      }))
    })}`,
    {},
    'POST'
  )) as IFetchAuthorListOutput;
  return {
    authors: data.authors,
    paging: data.paging
  };
};

export const editAuthor = async (payload: {
  id: number;
  body: Omit<IAuthorModels, 'id'>;
}): Promise<any> => {
  const data = await FetchService.isofetch(`/authors/details/${payload.id}`, payload.body, 'PATCH');
  if (data.success) {
    notistack.success('Author updated successfully');
  }
  return data;
};

export const addAuthor = async (payload: Omit<IAuthorModels, 'id'>): Promise<any> => {
  const data = await FetchService.isofetch('/authors/add', payload, 'POST');
  if (data.success) {
    notistack.success('Author added successfully');
  }
  return data;
};
export const deleteAuthor = async (payload: { id: number }): Promise<any> => {
  const data = await FetchService.isofetch(`/authors/details/${payload.id}`, payload, 'DELETE');
  notistack.success('Author deleted successfully');

  return data;
};
