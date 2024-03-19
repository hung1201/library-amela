import Footer from '../../../components/layout/Footer';
import Header from '../../../components/layout/Header';
import { NextPageWithLayout, withPageLayout } from '../../../components/layout/LayoutContainers';
import RoutesConfig from '../../../config/routesConfig';
import Authors from '../../../feature/authors';
import withPageAuth from '../../../middleware/withPageAuth';

const Page: NextPageWithLayout = withPageAuth(
  () => {
    return <Authors />;
  },
  {
    requiredAuth: true
  }
);
Page.getLayout = withPageLayout({
  FooterComponent: Footer,
  BaseHeaderComponent: () => (
    <Header
      path={{
        label: 'Authors',
        href: RoutesConfig.AuthorPage.path()
      }}
    />
  )
});
export default Page;
