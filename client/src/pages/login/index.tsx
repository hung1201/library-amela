import { Field, Form, Formik, FormikProps } from 'formik';

import FetchService from '../../services/Fetch.service';

import AuthContainer from '../../components/AuthContainer';
import RoutesConfig from '../../config/routesConfig';
import withPageAuth from '../../middleware/withPageAuth';
import { ActionType, useAuth } from '../../services/Auth.context';
import NavService from '../../services/Nav.service';
import TokenService from '../../services/Token.service';
import { ILoginIn, ILoginOutput } from '../../types/auth.types';

interface IProps {}

function Login(props: IProps) {
  const [auth, authDispatch] = useAuth();
  const navService = new NavService();
  return (
    <AuthContainer
      backgroundImageUrl="https://s3-alpha-sig.figma.com/img/0555/8084/d65c04a52ef78dca66bd0c332ffaaa42?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UGIeru0UU9H-LErBzhLXtc2ZEspM7Qmb-SEWsUhoosJXMnwGGFxVJRAh5XHob5qlK8RaCfPQTTsDYNyi0OHhgOdMmG6vVYjR2ac5AMeZVjHufQRhOhBuXjXetvETYj2IyMf35Ark6vvXfsjCXifSy4TP0aAOgoCi5u8-RSgsAcb0LoRQRAIUwBO88vV4YCisM6-GMlpuB2k9I5KsWhJM9Zjg4JPHLqAbmuNdG7PRhEfU32hvW7cc48NQyFYNqfryKAeX6Qpb94z~c74ggV~SmcdDiLl-7Gi-hn4zLdnRDrMc4JYg9I2NxUpOokRHsRiCWk-1CFGfwXPhv3HMFT0Yvg__"
      form={
        <>
          <div className="flex flex-col mt-2 max-w-full w-[432px]">
            <h2 className="text-3xl font-semibold tracking-normal leading-10 text-white max-md:max-w-full">
              Login
            </h2>
            <p className="mt-7 leading-6 max-md:max-w-full text-white">
              Persiapkan diri untuk masa depan yang penuh dengan bintang
            </p>
            <Formik
              initialValues={{
                email: '',
                password: '',
                isRemember: false
              }}
              onSubmit={(values: ILoginIn, { setSubmitting }: FormikProps<ILoginIn>) => {
                FetchService.isofetch(
                  '/auth/login',
                  {
                    email: values.email,
                    password: values.password,
                    isRemember: true
                  },
                  'POST'
                )
                  .then((res: ILoginOutput) => {
                    setSubmitting(false);
                    if (res.success) {
                      const tokenService = new TokenService();
                      tokenService.saveToken(res.authToken);
                      authDispatch({
                        type: ActionType.SetDetails,
                        payload: {
                          email: res.email,
                          name: `${res.firstName ?? ''} ${res.lastName ?? ''}`
                        }
                      });
                      navService.redirectUser(RoutesConfig.HomePage.path());
                    }
                  })
                  .catch();
              }}
              render={() => (
                <Form autoComplete="off">
                  <div className="justify-center items-start px-8 py-7 mt-4 whitespace-nowrap rounded-lg border-2 border-solid border-white border-opacity-10 max-md:px-5 max-md:max-w-full">
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
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
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Pas*****"
                      aria-label="Password"
                      className="w-full bg-transparent focus:outline-none text-white"
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label className="flex items-center mt-4 ml-1">
                      <Field
                        id="isRemember"
                        name="isRemember"
                        type="checkbox"
                        className="form-checkbox bg-transparent"
                      />
                      <span className="ml-2" style={{ color: '#F4F6FC' }}>
                        simpan info masuk
                      </span>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="justify-center items-center px-16 py-7 mt-10 text-lg font-bold tracking-normal text-gray-800 bg-amber-200 rounded-md max-md:px-5 w-full"
                    style={{ background: '#FCD980', letterSpacing: 4 }}
                  >
                    MUSK
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
                  navService.redirectUser('/register');
                }}
                className="underline"
              >
                Daftar
              </a>
            </p>
          </div>
        </>
      }
    />
  );
}

export default withPageAuth(Login, { requiredAuth: false });
