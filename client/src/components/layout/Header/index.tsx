import * as React from 'react';
import { useAuth } from '../../../services/Auth.context';

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
      className="flex gap-5 px-11 py-6 w-full text-white justify-between bg-blue-950 leading-[150%] max-md:flex-wrap max-md:px-5 max-md:max-w-full "
      style={{ background: '#1C1E53' }}
    >
      <div className=" flex items-center text-2xl font-bold leading-8">[EDUFREE]</div>
      <nav className="flex items-center text-base flex-1 justify-center max-md:flex-wrap gap-5">
        <div className="flex items-center gap-5 ">
          <NavLink>HOME</NavLink>
          <NavLink>TENTANG KAMI</NavLink>
          <NavLink>KURSUS</NavLink>
          <NavLink>FAQ</NavLink>
        </div>
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
      <div className="flex gap-2">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8688c0529c1cdbdee2301b44729a474ad1700f3e83d22aa0d933f4a6cec712a3?apiKey=814c5027f0c542eab8b97b5044d0ad6a&"
          alt="User avatar"
          className="shrink-0 w-11 rounded-full aspect-[1.05]"
        />
        <div className="flex flex-col">
          <div className="text-sm font-medium">Hi, {auth?.name}</div>
          <div className="mt-2 text-xs">{auth?.email ?? ''}</div>
        </div>
      </div>
    </header>
  );
};

const Breadcrumbs: React.FC = () => {
  return (
    <nav
      className="justify-center items-start px-14 py-8 w-full text-base font-medium leading-7 text-gray-800 bg-slate-100 max-md:px-5 max-md:max-w-full"
      style={{ background: '#EEF4FA' }}
    >
      Home &gt; Kursus
    </nav>
  );
};

const HeaderDefault: React.FC = () => {
  return (
    <div className="flex flex-col ">
      <Header />
      <Breadcrumbs />
    </div>
  );
};

export default HeaderDefault;
