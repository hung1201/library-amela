import { NextPageContext } from 'next/types';

import Cookies from 'universal-cookie';

import FetchService from '../services/Fetch.service';
import NavService from '../services/Nav.service';
import RoutesConfig from '../config/routesConfig';

class TokenService {
  public saveToken(token: string) {
    const cookies = new Cookies();
    cookies.set('token', token, { path: '/' });
    return Promise.resolve();
  }
  public getToken() {
    const cookies = new Cookies();
    return cookies.get('token') as string;
  }
  public deleteToken() {
    const cookies = new Cookies();
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
    const response = await this.checkAuthToken(token, ssr);

    if (!response.success) {
      const navService = new NavService();
      navService.redirectUser(RoutesConfig.LoginPage.path(), ctx);
      this.deleteToken();
    }
  }
}

export default TokenService;
