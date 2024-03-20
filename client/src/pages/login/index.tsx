import Login from '../../feature/auth/login';
import withPageAuth from '../../middleware/withPageAuth';

interface IProps {}

function Page(props: IProps) {
  return <Login />;
}

export default withPageAuth(Page, { requiredAuth: false });
