import { Field, Form, Formik, FormikProps } from 'formik';

import { CircularProgress, useTheme } from '@material-ui/core';
import { useLoginUser } from '../../../api';
import AuthContainer from '../../../components/AuthContainer';
import RoutesConfig from '../../../config/routesConfig';
import { ActionType, useAuth } from '../../../services/Auth.context';
import NavService from '../../../services/Nav.service';
import TokenService from '../../../services/Token.service';
import { ILoginIn } from '../../../types/auth.types';
type Props = {};

const Login = (props: Props) => {
  const theme = useTheme();
  const [auth, authDispatch] = useAuth();
  const navService = new NavService();
  const tokenService = new TokenService();
  const { mutate, isLoading } = useLoginUser({
    onSuccess(data) {
      tokenService.saveToken(data.authToken, data.isRemember);
      authDispatch({
        type: ActionType.SetDetails,
        payload: {
          email: data.email,
          name: `${data.fullName ?? ''}`
        }
      });
      navService.redirectUser(RoutesConfig.HomePage.path());
    }
  });
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
              validate={(values) => {
                const errors = { email: '', password: '' };
                if (!values.email) {
                  errors.email = 'Required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                  errors.email = 'Invalid email address';
                }
                if (values.password === '') {
                  errors.password = 'Required';
                }
                if (values.password.length < 8) {
                  errors.password = 'Password must be at least 8 characters';
                }
                const checkErrorsEmpty = Object.values(errors).filter((x) => x);
                if (checkErrorsEmpty.length > 0) {
                  return errors;
                }
              }}
              initialValues={{
                email: '',
                password: '',
                isRemember: false
              }}
              onSubmit={(values: ILoginIn, { setSubmitting }: FormikProps<ILoginIn>) => {
                mutate({
                  email: values.email,
                  password: values.password,
                  isRemember: values.isRemember
                });
              }}
              render={({ values, errors, touched }) => (
                <Form>
                  <div
                    className={`justify-center items-start px-8 py-7 mt-4 whitespace-nowrap rounded-lg border-2 border-solid ${
                      errors.email && touched.email
                        ? 'border-red-500'
                        : 'border-white border-opacity-10'
                    } max-md:px-5 max-md:max-w-full`}
                  >
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      aria-label="Email"
                      className={`w-full bg-transparent focus:outline-none text-white ${
                        errors.email && touched.email ? 'text-red-500' : ''
                      }`}
                      autoComplete="new-password"
                      style={{ background: 'transparent !important' }}
                    />
                  </div>
                  {errors.email && touched.email ? (
                    <div className="text-red-500">{errors.email}</div>
                  ) : null}
                  <div
                    className={`justify-center items-start px-8 py-7 mt-4 whitespace-nowrap rounded-lg border-2 border-solid ${
                      errors.password && touched.password
                        ? 'border-red-500'
                        : 'border-white border-opacity-10'
                    } max-md:px-5 max-md:max-w-full`}
                  >
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <Field
                      type="password"
                      style={{ background: 'transparent !important' }}
                      id="password"
                      name="password"
                      placeholder="Pas*****"
                      aria-label="Password"
                      className={`w-full bg-transparent focus:outline-none text-white ${
                        errors.password && touched.password ? 'text-red-500' : ''
                      }`}
                      autoComplete="new-password"
                    />
                  </div>
                  {errors.password && touched.password ? (
                    <div className="text-red-500">{errors.password}</div>
                  ) : null}
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
                    disabled={isLoading}
                    type="submit"
                    className="flex gap-2 justify-center items-center px-16 py-7 mt-10 text-lg font-bold tracking-normal text-gray-800 bg-amber-200 rounded-md max-md:px-5 w-full"
                    style={{ background: theme.palette.secondary.main, letterSpacing: 4 }}
                  >
                    {isLoading ? <CircularProgress size={20} /> : <></>}
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
                  navService.redirectUser(RoutesConfig.RegisterPage.path());
                }}
                className="underline"
              >
                Daftar
              </a>
            </p>
            <p className="self-center mt-1 text-lg flex gap-1 tracking-normal text-white underline">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navService.redirectUser(RoutesConfig.ForgotPasswordPage.path());
                }}
                className="underline"
              >
                Lupa password
              </a>
            </p>
          </div>
        </>
      }
    />
  );
};

export default Login;
