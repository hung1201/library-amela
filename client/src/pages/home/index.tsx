import { Box } from '@material-ui/core';
import PageContent from '../../components/PageContent';
import Footer from '../../components/layout/Footer';
import Header from '../../components/layout/Header';
import { NextPageWithLayout, withPageLayout } from '../../components/layout/LayoutContainers';

import HomePage from '../../feature/home';
import withPageAuth from '../../middleware/withPageAuth';
import RoutesConfig from '../../config/routesConfig';

const Home: NextPageWithLayout = withPageAuth(
  () => {
    return (
      <PageContent>
        <Box
          className="pt-10 md:pt-32 pb-20 md:pb-44 px-5 md:px-12 lg:px-20"
          display={'flex'}
          sx={{
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <HomePage />
        </Box>
      </PageContent>
    );
  },
  {
    requiredAuth: true,
    redirect: RoutesConfig.LoginPage.path()
  }
);
Home.getLayout = withPageLayout({
  FooterComponent: Footer,
  BaseHeaderComponent: () => (
    <Header
      path={{
        label: 'Kursus',
        href: ''
      }}
    />
  )
});
export default Home;
