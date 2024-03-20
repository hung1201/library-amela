import { useLayoutEffect, useMemo } from 'react';
import { useAuth } from '../services/Auth.context';
import TokenService from '../services/Token.service';
import NavService from '../services/Nav.service';
import Login from '../pages/login';
import RoutesConfig from '../config/routesConfig';

const withPageAuth = <T extends {}>(
  WrappedComponent: React.ComponentType<T>,
  options?: {
    requiredAuth?: boolean;
    redirect?: string | ((props: T) => React.ReactNode);
  }
) => {
  return (props: T) => {
    const tokenService = new TokenService();
    const [state] = useAuth();

    const token = useMemo(() => tokenService.getToken(), []);
    const isLoggedIn = Boolean(state.email && token);
    const navService = new NavService();
    const accessPermission = useMemo(() => {
      if (options.requiredAuth === undefined) {
        return true;
      } else if (!options.requiredAuth && !isLoggedIn) {
        return true;
      }
      if (options.requiredAuth && isLoggedIn) {
        return true;
      } else return false;
    }, []);
    useLayoutEffect(() => {
      async function checkToken() {
        await tokenService.authenticateTokenSsr();
      }
      if (!options?.requiredAuth && token) {
        navService.redirectUser(RoutesConfig.HomePage.path());
      }
      if (options?.requiredAuth) {
        checkToken();
      }
    }, [token, options.requiredAuth]);
    return (
      <>
        {accessPermission ? (
          <WrappedComponent {...props} />
        ) : (
          typeof options?.redirect === 'function' && options?.redirect(props)
        )}
      </>
    );
  };
};

export default withPageAuth;
