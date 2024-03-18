import { useLayoutEffect, useMemo } from 'react';
import { useAuth } from '../services/Auth.context';
import TokenService from '../services/Token.service';
import NavService from '../services/Nav.service';
import Login from '../pages/login';

const withPageAuth = <T extends {}>(
  WrappedComponent: React.ComponentType<T>,
  options?: {
    requiredAuth?: boolean;
  }
) => {
  return (props: T) => {
    const tokenService = new TokenService();
    const token = useMemo(() => tokenService.getToken(), []);
    const navService = new NavService();
    useLayoutEffect(() => {
      async function checkToken() {
        await tokenService.authenticateTokenSsr();
      }
      if (!options?.requiredAuth && token) {
        navService.redirectUser('/');
      }
      if (options?.requiredAuth) {
        checkToken();
      }
    }, [token, options.requiredAuth]);

    return <WrappedComponent {...props} />;
  };
};

export default withPageAuth;
