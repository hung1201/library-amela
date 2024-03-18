import PageContent from '../../components/PageContent';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import { NextPageWithLayout, withPageLayout } from '../../components/layout/LayoutContainers';

import withPageAuth from '../../middleware/withPageAuth';
import { useAuth } from '../../services/Auth.context';
import { useGlobalMessaging } from '../../services/GlobalMessaging.context';
import TokenService from '../../services/Token.service';

interface IProps {
  action: string;
}

const Home: NextPageWithLayout = withPageAuth(
  () => {
    const tokenService = new TokenService();
    const [messageState, messageDispatch] = useGlobalMessaging();
    const [authState, authDispatch] = useAuth();

    return (
      <PageContent>
        <>Helo</>
      </PageContent>
    );
  },
  {
    requiredAuth: true
  }
);
Home.getLayout = withPageLayout({
  FooterComponent: Footer,
  BaseHeaderComponent: Header
});
export default Home;
