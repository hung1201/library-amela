import * as React from 'react';
import { ActionType, useAuth } from '../../../services/Auth.context';
import BreadcrumbsContainer, { IPath } from '../../PageBreadcrumbs';
import RoutesConfig from '../../../config/routesConfig';
import { useTheme, Link, Drawer, useMediaQuery, Button } from '@material-ui/core';
import NavService from '../../../services/Nav.service';
import TokenService from '../../../services/Token.service';
import UserInfo from './components/UserInfo';

interface NavLinkProps {
  children: React.ReactNode;
  href?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ children, href = '' }) => {
  const nav = new NavService();
  return (
    <div className="cursor-pointer" onClick={() => nav.redirectUser(href)}>
      {children}
    </div>
  );
};

const Header: React.FC = () => {
  const theme = useTheme();
  const [auth, dispatch] = useAuth();
  const tokenService = new TokenService();
  const navService = new NavService();
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
  return (
    <header
      className="flex px-5 py-6 w-full text-white justify-between bg-blue-950 leading-[150%]  md:mx-auto"
      style={{ background: theme.palette.primary.main }}
    >
      <div className="flex items-center text-2xl font-bold leading-8">[EDUFREE]</div>
      <nav className="hidden lg:flex items-center text-base flex-1 justify-center gap-5">
        <NavLink href={RoutesConfig.HomePage.path()}>HOME</NavLink>
        <NavLink>TENTANG KAMI</NavLink>
        <NavLink>KURSUS</NavLink>
        <NavLink>FAQ</NavLink>
        <NavLink href={RoutesConfig.AuthorPage.path({})}>AUTHORS</NavLink>
        <NavLink href={RoutesConfig.BookPage.path({})}>BOOKS</NavLink>
        <div className="flex items-center gap-1">
          <div className="">BLOG</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/218d18b130956a79f11399373a5dbb80fe7a08261d3d0965fddad7eaaa2fdcf1?apiKey=814c5027f0c542eab8b97b5044d0ad6a&"
            alt="Blog icon"
            className="shrink-0 aspect-[1.05] w-[21px]"
          />
        </div>
      </nav>
      <div className="flex items-center gap-2">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8688c0529c1cdbdee2301b44729a474ad1700f3e83d22aa0d933f4a6cec712a3?apiKey=814c5027f0c542eab8b97b5044d0ad6a&"
          alt="User avatar"
          className="shrink-0 w-11 rounded-full aspect-[1.05]"
          onClick={() => {
            setOpenDrawer((prev) => !prev);
          }}
        />
        <UserInfo />
      </div>
      <Drawer
        PaperProps={{
          style: {
            background: theme.palette.primary.main,
            width: '300px',
            padding: '20px'
          }
        }}
        anchor="right"
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
      >
        <nav className="flex lg:hidden flex-col items-center px-2 py-3 gap-2 text-white">
          <NavLink href={RoutesConfig.HomePage.path()}>HOME</NavLink>
          <NavLink>TENTANG KAMI</NavLink>
          <NavLink>KURSUS</NavLink>
          <NavLink>FAQ</NavLink>
          <NavLink href={RoutesConfig.AuthorPage.path({})}>AUTHORS</NavLink>
          <NavLink href={RoutesConfig.BookPage.path({})}>BOOKS</NavLink>
          <div className="flex items-center gap-1">
            <div className="">BLOG</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/218d18b130956a79f11399373a5dbb80fe7a08261d3d0965fddad7eaaa2fdcf1?apiKey=814c5027f0c542eab8b97b5044d0ad6a&"
              alt="Blog icon"
              className="shrink-0 aspect-[1.05] w-[21px]"
            />
          </div>
        </nav>
        <div className="w-full flex justify-center">
          <Button
            variant="text"
            style={{ background: theme.palette.secondary.main, textTransform: 'none' }}
            onClick={() => {
              tokenService.deleteToken();
              dispatch({
                type: ActionType.RemoveDetails,
                payload: { email: '', name: '' }
              });
              navService.redirectUser(RoutesConfig.LoginPage.path());
            }}
          >
            Log out
          </Button>
        </div>
      </Drawer>
    </header>
  );
};

const Breadcrumbs = ({ path }: { path: IPath }) => {
  const paths = [{ label: 'Home', href: RoutesConfig.HomePage.path() }, path].filter(
    (item) => item
  );
  return (
    <nav
      className="px-5 md:py-8 py-4 w-full text-base font-medium leading-7 text-gray-800 bg-slate-100 md:px-5"
      style={{ background: '#EEF4FA' }}
    >
      <div className="flex justify-start items-start mx-auto">
        <div className="flex items-center space-x-2">
          <BreadcrumbsContainer paths={paths} />
        </div>
      </div>
    </nav>
  );
};

const HeaderDefault = ({ path }: { path?: IPath }) => {
  return (
    <div className="flex flex-col ">
      <Header />
      <Breadcrumbs path={path} />
    </div>
  );
};

export default HeaderDefault;
