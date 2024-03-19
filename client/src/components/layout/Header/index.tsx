import * as React from 'react';
import { useAuth } from '../../../services/Auth.context';
import BreadcrumbsContainer, { IPath } from '../../PageBreadcrumbs';
import RoutesConfig from '../../../config/routesConfig';

interface NavLinkProps {
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ children }) => {
  return <div className="font-medium">{children}</div>;
};

const Header: React.FC = () => {
  const [auth] = useAuth();
  return (
    <header
      className="flex px-5 py-6 w-full text-white justify-between bg-blue-950 leading-[150%]  md:mx-auto"
      style={{ background: '#1C1E53' }}
    >
      <div className="flex items-center text-2xl font-bold leading-8">[EDUFREE]</div>
      <nav className="hidden md:flex items-center text-base flex-1 justify-center gap-5">
        <NavLink>HOME</NavLink>
        <NavLink>TENTANG KAMI</NavLink>
        <NavLink>KURSUS</NavLink>
        <NavLink>FAQ</NavLink>
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
        />
        <div className="hidden md:flex flex-col">
          <div className="text-sm font-medium">Hi, {auth?.name}</div>
          <div className="mt-2 text-xs">{auth?.email ?? ''}</div>
        </div>
      </div>
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
