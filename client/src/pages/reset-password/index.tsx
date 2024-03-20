import { NextPageWithLayout } from '../../components/layout/LayoutContainers';

import { Field, Form, Formik, FormikProps } from 'formik';
import AuthContainer from '../../components/AuthContainer';
import RoutesConfig from '../../config/routesConfig';
import withPageAuth from '../../middleware/withPageAuth';
import FetchService from '../../services/Fetch.service';
import { notistack } from '../../utils/notistack';
import ResetPassword from '../../feature/auth/reset-password';

const Page: NextPageWithLayout = withPageAuth(
  () => {
    return (
      <>
        <ResetPassword />
      </>
    );
  },
  {
    requiredAuth: false
  }
);

export default Page;
