import { Schema } from 'jsonschema';

export const registerSchema: Schema = {
  type: 'object',
  properties: {
    fullName: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' }
  },
  required: ['fullName', 'email', 'password'],
  additionalProperties: false
};

export const forgotPasswordSchema: Schema = {
  type: 'object',
  properties: {
    email: { type: 'string' }
  },
  required: ['email'],
  additionalProperties: false
};

export const resetPasswordSchema: Schema = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
    confirmPassword: { type: 'string' }
  },
  required: ['email', 'password', 'confirmPassword'],
  additionalProperties: false
};
export const loginSchema: Schema = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
    isRemember: { type: 'boolean' }
  },
  required: ['email', 'password'],
  additionalProperties: false
};
