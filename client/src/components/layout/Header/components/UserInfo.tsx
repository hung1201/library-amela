import React from 'react';
import { useAuth } from '../../../../services/Auth.context';
import withAuth from '../../../../middleware/withAuth';

type Props = {};

const UserInfo = withAuth(
  (props: Props) => {
    const [auth, dispatch] = useAuth();

    return (
      <div className="hidden md:flex flex-col">
        <div className="text-sm font-medium">Hi, {auth?.name}</div>
        <div className="mt-1 text-xs">{auth?.email ?? ''}</div>
      </div>
    );
  },
  {
    requiredAuth: true
  }
);

export default UserInfo;
