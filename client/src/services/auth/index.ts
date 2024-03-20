import { ILoginIn, IRegisterIn } from '../../types/auth.types';
import FetchService from '../Fetch.service';
import TokenService from '../Token.service';

export const registerUser = async (payload: IRegisterIn) => {
  const data = await FetchService.isofetch(
    '/auth/register',
    {
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password
    },
    'POST'
  );
  return data;
};
export const loginUser = async (payload: ILoginIn) => {
  const data = await FetchService.isofetch(
    '/auth/login',
    {
      email: payload.email,
      password: payload.password,
      isRemember: true
    },
    'POST'
  );
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
