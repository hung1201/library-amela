import { Schema } from 'jsonschema';

export const listAuthorSchema: Schema = {
  type: 'object',
  properties: {
    page: { type: 'string' },
    pageSize: { type: 'string' },
    order: { type: 'string', enum: ['asc', 'desc'] },
    sortField: { type: 'string' }
  },
  required: [],
  additionalProperties: false
};

export const addAuthorSchema: Schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    bookIds: { type: 'array', items: { type: 'number' } }
  },
  required: ['name'],
  additionalProperties: false
};

export const editAuthorSchema: Schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    bookIds: { type: 'array', items: { type: 'number' } }
  },
  required: [],
  additionalProperties: false
};
