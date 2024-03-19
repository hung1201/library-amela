import _ from 'lodash';
import {
  IAuthorModels,
  IFetchAuthorListInput,
  IFetchAuthorListOutput
} from '../../types/authors.types';
import FetchService from '../Fetch.service';
import { varToStringParams } from '../../utils/path';

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
  return data;
};

export const addAuthor = async (payload: Omit<IAuthorModels, 'id'>): Promise<any> => {
  const data = await FetchService.isofetch('/authors/add', payload, 'POST');
  return data;
};
export const deleteAuthor = async (payload: { id: number }): Promise<any> => {
  const data = await FetchService.isofetch(`/authors/details/${payload.id}`, payload, 'DELETE');
  return data;
};
