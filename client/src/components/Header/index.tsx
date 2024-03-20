import css from './Head.module.scss';

import Head from 'next/head';

import { useAuth } from '../../services/Auth.context';
import { useGlobalMessaging } from '../../services/GlobalMessaging.context';
import TokenService from '../../services/Token.service';

interface IProps {}

function Header(props: IProps) {
  return (
    <Head>
      <title>Library</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  );
}

export default Header;
