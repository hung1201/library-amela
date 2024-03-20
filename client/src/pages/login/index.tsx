import { useTheme } from '@material-ui/core';
import Login from '../../feature/auth/login';
import withPageAuth from '../../middleware/withPageAuth';
import { useAuth } from '../../services/Auth.context';
import NavService from '../../services/Nav.service';

interface IProps {}

function Page(props: IProps) {
  return <Login />;
}

export default withPageAuth(Page, { requiredAuth: false });
