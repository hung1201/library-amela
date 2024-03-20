import React from 'react';
import { useAuth } from '../services/Auth.context';
import TokenService from '../services/Token.service';

interface IOptions {
  requiredAuth?: boolean;
}

export default function withAuth<T>(
  Component: React.FC<T & { children?: React.ReactNode }>,
  options?: IOptions
) {
  const ComposedComponent = (props: T & { children?: React.ReactNode }) => {
    const [auth] = useAuth();
    const token = new TokenService();
    const tokenString = token.getToken();
    const hasAccess = React.useMemo(() => {
      if (options?.requiredAuth && auth.name && tokenString) {
        return true;
      }
      return false;
    }, [auth.name, tokenString]);

    return <>{hasAccess ? <Component {...props} /> : null}</>;
  };
  return ComposedComponent;
}
