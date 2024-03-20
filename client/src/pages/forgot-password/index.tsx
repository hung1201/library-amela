import { useTheme } from '@material-ui/core';
import { NextPageWithLayout } from '../../components/layout/LayoutContainers';

import ForgotPassword from '../../feature/auth/forgot-password';
import withPageAuth from '../../middleware/withPageAuth';
import NavService from '../../services/Nav.service';

const Page: NextPageWithLayout = withPageAuth(
  () => {
    const navService = new NavService();
    const theme = useTheme();
    return (
      <>
        <ForgotPassword />
      </>
    );
  },
  {
    requiredAuth: false
  }
);

export default Page;
