import _ from 'lodash';
import { varToStringParams } from '../../utils/path';

// import AuthConfig, { IAuthRoutesConfig } from "./auth";
export type IRoute<T = {}> = {
  path: (params?: T) => string;
};
export interface IRoutesConfig {
  NotFoundPage: IRoute;
  LoginPage: IRoute;
  ForgotPasswordPage: IRoute;
  RegisterPage: IRoute;
  HomePage: IRoute<{
    page?: number;
    pageSize?: number;
    orderType?: string;
    sortField?: string;
    title?: string;
  }>;
  BookPage: IRoute<{
    page?: number;
    pageSize?: number;
    orderType?: string;
    sortField?: string;
  }>;
  AuthorPage: IRoute<{
    page?: number;
    pageSize?: number;
    orderType?: string;
    sortField?: string;
  }>;
}

const RoutesConfig: IRoutesConfig = {
  LoginPage: { path: () => '/login' },
  NotFoundPage: { path: () => '/404' },
  RegisterPage: { path: () => '/register' },
  ForgotPasswordPage: { path: () => '/forgot-password' },
  HomePage: {
    path: (params) =>
      `/${varToStringParams({
        variablesArray: Object.keys(params ?? {}).map((key) => ({
          key: key,
          value: _.get(params, key)
        }))
      })}`
  },
  BookPage: {
    path: (params) =>
      `/cms/books${varToStringParams({
        variablesArray: Object.keys(params ?? {}).map((key) => ({
          key: key,
          value: _.get(params, key)
        }))
      })}`
  },
  AuthorPage: {
    path: (params) =>
      `/cms/authors${varToStringParams({
        variablesArray: Object.keys(params ?? {}).map((key) => ({
          key: key,
          value: _.get(params, key)
        }))
      })}`
  }
};
export const DefaultRoute = RoutesConfig.HomePage.path();
export default RoutesConfig;
