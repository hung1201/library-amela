import Footer from '../../../components/layout/Footer';
import Header from '../../../components/layout/Header';
import { NextPageWithLayout, withPageLayout } from '../../../components/layout/LayoutContainers';
import RoutesConfig from '../../../config/routesConfig';
import Book from '../../../feature/books';
import withPageAuth from '../../../middleware/withPageAuth';

interface IProps {}

const Page: NextPageWithLayout = withPageAuth(
  () => {
    return <Book />;
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
        label: 'Books',
        href: RoutesConfig.BookPage.path()
      }}
    />
  )
});
export default Page;
