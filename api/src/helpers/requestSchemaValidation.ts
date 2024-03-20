import express from 'express';

import jsonschema, { Schema } from 'jsonschema';
import _ from 'lodash';
export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  TOO_MANY_REQUESTS = 429
}
export type NestedExtention<T, Y> = T extends Function
  ? T
  : T extends object
  ? { [K in keyof T]: NestedExtention<T[K], Y> } & (T extends readonly any[] ? unknown : Y)
  : T;
export type ISchema = NestedExtention<
  Schema,
  {
    validationMessages?: {
      [key: string]: string;
    };
  }
>;
export type SchemaType = 'body' | 'query';
const Validator = jsonschema.Validator;

const v = new Validator();

export const validateJsonSchema = (json: any, schema: any) => {
  const val = v.validate(json, schema);
  if (!val.valid) {
    const err: Array<{ field: string; errorType: string; message: string }> = [];
    val.errors.forEach((element) => {
      const messagesPath = 'validationMessages';
      const valMessage = `${messagesPath}.${element.name}`;

      err.push({
        field: element.path.join('.'),
        errorType: element.name,
        message: _.get(element.schema, valMessage, element.stack)
      });
    });
    return {
      message: err.map((el) => el.message).toString(),
      isValid: false
    };
  }

  return {
    message: 'Json is Valid',
    isValid: true
  };
};
export const requestSchemaValidation = (schema: jsonschema.Schema, type: SchemaType = 'body') => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const body = type == 'body' ? req.body : req.query;
  const { message, isValid } = validateJsonSchema(body, schema);

  if (!isValid) {
    return res.send({
      message,
      success: false
    });
  } else {
    return next();
  }
};
