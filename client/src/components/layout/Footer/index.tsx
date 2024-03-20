import { useTheme } from '@material-ui/core';
import * as React from 'react';

interface SocialMediaLinkProps {
  name: string;
}

const SocialMediaLink: React.FC<SocialMediaLinkProps> = ({ name }) => {
  return <div className="mt-3">{name}</div>;
};

interface ProgramLinkProps {
  name: string;
}

const ProgramLink: React.FC<ProgramLinkProps> = ({ name }) => {
  return <div className="mt-3">{name}</div>;
};

interface SupportLinkProps {
  name: string;
}

const SupportLink: React.FC<SupportLinkProps> = ({ name }) => {
  return <div className="mt-3.5">{name}</div>;
};

const socialMediaLinks = ['Instagram', 'Twitter', 'LinkedIn'];
const programLinks = ['Merdeka Belajar', 'Finterpreneur'];
const supportLinks = ['Tentang Kami', 'Ketentuan', 'Kebijakan Privasi'];

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <footer className="flex flex-col">
      <div
        className="px-5 pt-16 bg-blue-950 md:px-20 lg:px-32"
        style={{ background: theme.palette.primary.main }}
      >
        <div className="flex flex-col md:flex-row md:gap-5">
          <div className="flex flex-col md:w-6/12">
            <div className="flex flex-col text-white md:mt-10">
              <h1 className="text-2xl font-bold tracking-normal leading-8">[EDUFREE]</h1>
              <p className="mt-5 text-base leading-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit sed.
              </p>
              <div
                className="flex gap-5 justify-between flex-wrap px-2 py-3 md:w-9/12 md:px-8 md:py-5 md:mt-28 bg-amber-200 rounded-md"
                style={{
                  backgroundColor: theme.palette.secondary.main
                }}
              >
                <div className=" flex flex-col" style={{ color: '#282938' }}>
                  <h2 className="text-lg font-medium tracking-normal">Email</h2>
                  <p className="mt-5 text-base">contact@website.com</p>
                </div>
                <div className=" flex flex-col self-start" style={{ color: '#282938' }}>
                  <h2 className="text-lg font-medium tracking-normal">Telephone</h2>
                  <p className="mt-3.5 text-base">+6288 999 222 333</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-5 md:mt-0 md:w-6/12">
            <div className="md:max-w-full">
              <div className="flex flex-col gap-5 md:flex-row md:justify-between">
                <div className="flex flex-col w-full">
                  <div className="flex flex-col text-lg text-white md:mt-10">
                    <h2 className="text-xl font-medium tracking-normal">Sosial Media</h2>
                    {socialMediaLinks.map((link, index) => (
                      <SocialMediaLink key={index} name={link} />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col w-full mt-5 md:mt-0 md:w-[33%]">
                  <div className="flex flex-col text-lg text-white md:mt-10">
                    <h2 className="text-xl font-medium tracking-normal">Program</h2>
                    {programLinks.map((link, index) => (
                      <ProgramLink key={index} name={link} />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col w-full mt-5 md:mt-0 md:w-[33%]">
                  <div className="flex flex-col text-lg text-white md:mt-10">
                    <h2 className="text-xl font-medium tracking-normal">DUKUNGAN</h2>
                    {supportLinks.map((link, index) => (
                      <SupportLink key={index} name={link} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 py-8 bg-white md:px-20 lg:px-32">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="text-lg text-gray-800">© Copyright EDUFREE 2021 - 2022</div>
          <nav className="flex mt-1 text-base text-gray-800 md:mt-0">
            <a href="/">HOME</a>
            <a href="/about" className="flex-auto">
              TENTANG KAMI
            </a>
            <a href="/courses">KURSUS</a>
            <a href="/faq">FAQ</a>
            <a href="/blog">BLOG</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
