import { Schema } from 'jsonschema';

export const listBookSchema: Schema = {
  type: 'object',
  properties: {
    page: { type: 'string' },
    pageSize: { type: 'string' },
    order: { type: 'string', enum: ['asc', 'desc'] },
    sortField: { type: 'string' },
    title: { type: 'string' }
  },
  required: [],
  additionalProperties: false
};

export const addBookSchema: Schema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    pubYear: { type: 'string' },
    authorId: { type: 'number' }
  },
  required: ['title'],
  additionalProperties: false
};

export const editBookSchema: Schema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    pubYear: { type: 'string' },
    authorId: { type: 'number' }
  },
  required: [],
  additionalProperties: false
};
