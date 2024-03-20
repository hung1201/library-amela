import { ILoginIn, IRegisterIn } from '../../types/auth.types';
import { notistack } from '../../utils/notistack';
import FetchService from '../Fetch.service';
import TokenService from '../Token.service';

export const registerUser = async (payload: IRegisterIn): Promise<any> => {
  const data = await FetchService.isofetch(
    '/auth/register',
    {
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password
    },
    'POST'
  );
  if (!data.success) {
    notistack.error('Register failed!');
    return;
  }
  return data;
};
export const loginUser = async (payload: ILoginIn) => {
  const data = await FetchService.isofetch(
    '/auth/login',
    {
      email: payload.email,
      password: payload.password,
      isRemember: payload.isRemember
    },
    'POST'
  );
  if (!data.success) {
    notistack.error('Login failed! Please check your email and password again');
    return;
  }
  return data;
};

export const saveTokens = (tokenStr: string) => {
  const token = new TokenService();
  token.saveToken(tokenStr);
  return Promise.resolve(true);
};

export const parseJwt = (fakeToken: string) => {
  const token = new TokenService();

  return Promise.resolve(true);
};

export const forgotPassword = async (payload: { email: string }) => {
  const data = await FetchService.isofetch(
    '/auth/forgot-password',
    {
      email: payload.email
    },
    'POST'
  );
  if (!data.success) {
    notistack.error('Failed to send reset password email! Please check your email again');
    return;
  }
  return data;
};

export const resetPassword = async (payload: {
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  const data = await FetchService.isofetch(
    '/auth/reset-password',
    {
      email: payload.email,
      password: payload.password,
      confirmPassword: payload.confirmPassword
    },
    'POST'
  );
  if (!data.success) {
    notistack.error('Failed to reset password! Please check your email again');
    return;
  }
  return data;
};
export const logout = () => {
  const token = new TokenService();
  token.deleteToken();
  return Promise.resolve(true);
};
