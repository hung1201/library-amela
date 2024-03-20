import Register from '../../feature/auth/register';
import withPageAuth from '../../middleware/withPageAuth';

interface IProps {}

function Page(props: IProps) {
  return <Register />;
}

export default withPageAuth(Page, { requiredAuth: false });
