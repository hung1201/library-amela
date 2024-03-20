import * as express from 'express';
export interface IUser {
  id: number;
  fullName: string;
  email: string;
  password?: string;
  authToken?: string;
  refreshToken?: string;
}

export interface IRegisterIn {
  fullName: string;
  email: string;
  password: string;
}

export interface ILoginInput extends express.Request {
  body: {
    email: string;
    password: string;
    isRemember: boolean;
  };
}
export interface ILoginOutput {
  success: boolean;
  authToken?: string;
  refreshToken?: string;
  fullName: string;
  email: string;
}
