import css from './index.module.scss';

import { Field, Form, Formik, FormikProps } from 'formik';
import * as React from 'react';

import PageContent from '../../components/PageContent';

import FetchService from '../../services/Fetch.service';
import { useGlobalMessaging } from '../../services/GlobalMessaging.context';

import { IRegisterIn } from '../../types/auth.types';
import NavService from '../../services/Nav.service';

interface IProps {}
interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}
const Image: React.FC<ImageProps> = ({ src, alt, className }) => (
  <img loading="lazy" src={src} alt={alt} className={className} />
);

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}
function Register(props: IProps) {
  const [messageState, messageDispatch] = useGlobalMessaging();
  const navService = new NavService();
  return (
    <PageContent>
      <div className="h-full p-16">
        <main
          style={{
            backgroundImage:
              'url(https://s3-alpha-sig.figma.com/img/0555/8084/d65c04a52ef78dca66bd0c332ffaaa42?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UGIeru0UU9H-LErBzhLXtc2ZEspM7Qmb-SEWsUhoosJXMnwGGFxVJRAh5XHob5qlK8RaCfPQTTsDYNyi0OHhgOdMmG6vVYjR2ac5AMeZVjHufQRhOhBuXjXetvETYj2IyMf35Ark6vvXfsjCXifSy4TP0aAOgoCi5u8-RSgsAcb0LoRQRAIUwBO88vV4YCisM6-GMlpuB2k9I5KsWhJM9Zjg4JPHLqAbmuNdG7PRhEfU32hvW7cc48NQyFYNqfryKAeX6Qpb94z~c74ggV~SmcdDiLl-7Gi-hn4zLdnRDrMc4JYg9I2NxUpOokRHsRiCWk-1CFGfwXPhv3HMFT0Yvg__)',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
          className="bg-opacity-60 max-md:mt-10 max-md:max-w-full bg-cover"
        >
          <div className="flex flex-col md:flex-row max-md:gap-0">
            <section
              className="flex w-full md:w-6/12"
              style={{ backdropFilter: 'brightness(0.5)' }}
            >
              <div className="flex overflow-hidden relative flex-col grow items-start px-20 py-20 min-h-[691px] max-md:px-5 max-md:max-w-full">
                <h2 className="relative mt-2.5 text-5xl font-semibold tracking-wide text-white leading-[67px]">
                  Selangkah Lebih Dekat Dengan <br /> Impianmu
                </h2>
                <p className="relative mt-10 text-base font-medium leading-7 text-white">
                  Sebuah layanan E-Learning gratis yang siap membantumu menjadi seorang ahli{' '}
                </p>
              </div>
            </section>
            <section className="flex w-full md:w-6/12" style={{ background: '#1C1E53' }}>
              <div className="flex justify-center py-12 px-10 items-center w-full text-base leading-6 text-slate-100 max-md:px-5 max-md:max-w-full">
                <div className="flex flex-col mt-2 max-w-full w-[432px]">
                  <h2 className="text-3xl font-semibold tracking-normal leading-10 text-white max-md:max-w-full">
                    Register
                  </h2>
                  <p className="mt-7 leading-6 max-md:max-w-full text-white">
                    Persiapkan diri untuk masa depan yang penuh dengan bintang
                  </p>
                  <Formik
                    initialValues={{
                      fullName: '',
                      email: '',
                      password: ''
                    }}
                    onSubmit={(
                      values: IRegisterIn,
                      { setSubmitting }: FormikProps<IRegisterIn>
                    ) => {
                      FetchService.isofetch(
                        '/auth/register',
                        {
                          fullName: values.fullName,
                          email: values.email,
                          password: values.password
                        },
                        'POST'
                      )
                        .then((res) => {
                          setSubmitting(false);
                          if (res.success) {
                            messageDispatch({
                              type: 'setMessage',
                              payload: {
                                message: 'You have registered!'
                              }
                            });
                          } else {
                            messageDispatch({
                              type: 'setMessage',
                              payload: {
                                message: res.message
                              }
                            });
                          }
                        })
                        .catch();
                    }}
                    render={() => (
                      <Form>
                        <div className="justify-center items-start px-8 py-7 mt-12 rounded-lg border-2 border-solid border-white border-opacity-10 max-md:px-5 max-md:mt-10 max-md:max-w-full">
                          <label htmlFor="name" className="sr-only">
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            placeholder="Your Name"
                            aria-label="Your Name"
                            className="w-full bg-transparent focus:outline-none text-white"
                            autoComplete="off"
                          />
                        </div>
                        <div className="justify-center items-start px-8 py-7 mt-4 whitespace-nowrap rounded-lg border-2 border-solid border-white border-opacity-10 max-md:px-5 max-md:max-w-full">
                          <label htmlFor="email" className="sr-only">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            aria-label="Email"
                            className="w-full bg-transparent focus:outline-none text-white"
                            autoComplete="off"
                          />
                        </div>
                        <div className="justify-center items-start px-8 py-7 mt-4 whitespace-nowrap rounded-lg border-2 border-solid border-white border-opacity-10 max-md:px-5 max-md:max-w-full">
                          <label htmlFor="password" className="sr-only">
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            aria-label="Password"
                            className="w-full bg-transparent focus:outline-none text-white"
                            autoComplete="off"
                            style={{ backgroundColor: 'transparent' }}
                          />
                        </div>
                        <button
                          type="submit"
                          className="justify-center items-center px-16 py-7 mt-10 text-lg font-bold tracking-normal text-gray-800 bg-amber-200 rounded-md max-md:px-5 w-full"
                          style={{ background: '#FCD980' }}
                        >
                          D A F T A R
                        </button>
                      </Form>
                    )}
                  />

                  <p className="self-center mt-8 text-lg flex gap-1 tracking-normal text-white underline">
                    Sudah punya akun?
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navService.redirectUser('/login');
                      }}
                      className="underline"
                    >
                      Login
                    </a>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </PageContent>
  );
}

export default Register;
const Button: React.FC<ButtonProps> = ({ children, className }) => (
  <button className={className}>{children}</button>
);
