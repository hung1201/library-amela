import { NextPageContext } from 'next/types';

import Cookies from 'universal-cookie';

import FetchService from '../services/Fetch.service';
import NavService from '../services/Nav.service';
import RoutesConfig from '../config/routesConfig';

class TokenService {
  public saveToken(token: string, isRemember?: boolean) {
    const cookies = new Cookies();
    if (isRemember) {
      cookies.set('token', token, {
        path: '/'
      });
    } else {
      // set to session storage insted of cookies
      sessionStorage.setItem('token', token);
    }

    return Promise.resolve();
  }
  public getToken() {
    const cookies = new Cookies();
    return cookies.get('token') as string;
  }
  public deleteToken() {
    const cookies = new Cookies();
    sessionStorage.removeItem('token');
    cookies.remove('token', { path: '/' });
    return;
  }

  public checkAuthToken(token: string, ssr: boolean): Promise<any> {
    return FetchService.isofetch(`/auth/validate`, { token }, 'POST');
  }

  public async authenticateTokenSsr(ctx?: NextPageContext) {
    const ssr = ctx?.req ? true : false;
    const cookies = new Cookies(ssr ? ctx.req.headers.cookie : null);
    const token = cookies.get('token');
    const tokenSession = sessionStorage.getItem('token');
    const response = await this.checkAuthToken(tokenSession ?? token, ssr);

    if (!response.success) {
      const navService = new NavService();
      navService.redirectUser(RoutesConfig.LoginPage.path(), ctx);
      this.deleteToken();
    }
  }
}

export default TokenService;
