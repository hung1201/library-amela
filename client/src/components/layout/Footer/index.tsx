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
  return (
    <footer className="flex flex-col mt-auto">
      <div
        className="px-20 pt-16 w-full bg-blue-950 max-md:px-5 max-md:max-w-full"
        style={{
          background: '#1C1E53'
        }}
      >
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow text-white max-md:mt-10">
              <h1 className="text-2xl font-bold tracking-normal leading-8">[EDUFREE]</h1>
              <p className="mt-5 text-base leading-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit sed.
              </p>
              <div
                style={{
                  background: '#FCD980'
                }}
                className="flex gap-5 w-9/12 justify-between px-8 py-5 mt-28 text-gray-800 bg-amber-200 rounded-md leading-[150%] max-md:px-5 max-md:mt-10"
              >
                <div className="flex flex-col whitespace-nowrap">
                  <h2 className="text-lg font-medium tracking-normal">Email</h2>
                  <p className="mt-5 text-base">contact@website.com</p>
                </div>
                <div className="flex flex-col self-start">
                  <h2 className="text-lg font-medium tracking-normal">Telephone</h2>
                  <p className="mt-3.5 text-base">+6288 999 222 333</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="max-md:mt-10 max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0 justify-between">
                <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col text-lg tracking-normal leading-7 text-white max-md:mt-10">
                    <h2 className="text-xl font-medium tracking-normal">Sosial Media</h2>
                    {socialMediaLinks.map((link, index) => (
                      <SocialMediaLink key={index} name={link} />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col text-lg tracking-normal leading-7 text-white max-md:mt-10">
                    <h2 className="text-xl font-medium tracking-normal">Program</h2>
                    {programLinks.map((link, index) => (
                      <ProgramLink key={index} name={link} />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow text-lg tracking-normal leading-7 text-white max-md:mt-10">
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
      <div className="flex gap-5 px-20 py-8 w-full font-medium bg-white leading-[150%] max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="flex-auto text-lg tracking-normal text-gray-800">
          © Copyright EDUFREE 2021 - 2022
        </div>
        <nav className="flex gap-5 self-start mt-1 text-base text-gray-800 max-md:flex-wrap">
          <a href="/">HOME</a>
          <a href="/about" className="flex-auto">
            TENTANG KAMI
          </a>
          <a href="/courses">KURSUS</a>
          <a href="/faq">FAQ</a>
          <a href="/blog">BLOG</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
