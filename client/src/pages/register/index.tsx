import { Field, Form, Formik, FormikProps } from 'formik';

import FetchService from '../../services/Fetch.service';

import AuthContainer from '../../components/AuthContainer';
import withPageAuth from '../../middleware/withPageAuth';
import NavService from '../../services/Nav.service';
import { IRegisterIn } from '../../types/auth.types';
import RoutesConfig from '../../config/routesConfig';
import { useTheme } from '@material-ui/core';
import { notistack } from '../../utils/notistack';

interface IProps {}

function Register(props: IProps) {
  const navService = new NavService();
  const theme = useTheme();
  return (
    <AuthContainer
      backgroundImageUrl="https://s3-alpha-sig.figma.com/img/5b6c/1d79/86620df9fa97823295e87b6faa6c7fc7?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DUCB53XA4ybQgJP-TX19kD3FHbHEATcUG6OBj2VdOYT8BYrMFXN2Qp1vjLGeSHCZVrJlrjO2-zs9CWMjwwkYdWAJ30WbLgnZpOAcWGW87Av7424pXLj5GrahVLy5oA7YkF3wji97X-yY-yZs1U0gvp5Xwa1CWZ-Qe6HN8vyCoTHDqDqn2YMMPUXciz-SOu1jyqLdjRcE~eRRJd8xSzEBRDS-d23jIX4e7UEvLn0Yqle0YVqYYz~LfyHpBw2jkY4rSfOb-XuXLYzycrLDsGo1A5kKYlPwHVerQaPXsDML6HEkgSUBmYwi6m5Tb1jOhvGvFaqULWd2Zs7yCA7~Cy9j5A__"
      form={
        <>
          {' '}
          <div className="flex flex-col mt-2 max-w-full w-[432px]">
            <h2 className="text-3xl font-semibold tracking-normal leading-10 text-white max-md:max-w-full">
              Register
            </h2>
            <p className="mt-4 leading-6 max-md:max-w-full text-white">
              Persiapkan diri untuk masa depan yang penuh dengan bintang
            </p>
            <Formik
              validate={(values) => {
                const errors = { fullName: '', email: '', password: '' };
                if (!values.email) {
                  errors.email = 'Required';
                }
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                  errors.email = 'Invalid email address';
                }
                if (values.password === '') {
                  errors.password = 'Required';
                }
                if (values.password.length < 8) {
                  errors.password = 'Password must be at least 8 characters';
                }
                if (values.fullName === '') {
                  errors.fullName = 'Required';
                }
                const checkErrorsEmpty = Object.values(errors).filter((x) => x);
                if (checkErrorsEmpty.length > 0) {
                  return errors;
                }
              }}
              initialValues={{
                fullName: '',
                email: '',
                password: ''
              }}
              onSubmit={(values: IRegisterIn, { setSubmitting }: FormikProps<IRegisterIn>) => {
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
                      notistack.success(res.message);
                      navService.redirectUser(RoutesConfig.LoginPage.path());
                      return;
                    }
                    throw new Error('Register failed');
                  })
                  .catch((err: Error) => {
                    notistack.error(err.message);
                  });
              }}
              render={({ values, errors, touched }) => (
                <Form autoComplete="off">
                  <div
                    className={`justify-center items-start px-8 py-7 mt-6 rounded-lg border-2 border-solid ${
                      errors.fullName && touched.fullName
                        ? 'border-red-500'
                        : 'border-white border-opacity-10'
                    } max-md:px-5 max-md:mt-10 max-md:max-w-full`}
                  >
                    <label htmlFor="name" className="sr-only">
                      Your Name
                    </label>
                    <Field
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="Your Name"
                      aria-label="Your Name"
                      className="w-full bg-transparent focus:outline-none text-white"
                      autoComplete="off"
                    />
                  </div>
                  {errors.fullName && touched.fullName ? (
                    <div className="text-red-500">{errors.fullName}</div>
                  ) : null}
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
                      className="w-full bg-transparent focus:outline-none text-white"
                      autoComplete="off"
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
                      id="password"
                      name="password"
                      placeholder="Pas*****"
                      aria-label="Password"
                      className="w-full bg-transparent focus:outline-none text-white"
                      autoComplete="off"
                      style={{ backgroundColor: 'transparent' }}
                    />
                  </div>
                  {errors.password && touched.password ? (
                    <div className="text-red-500">{errors.password}</div>
                  ) : null}
                  <button
                    type="submit"
                    className="justify-center items-center px-16 py-7 mt-10 text-lg font-bold tracking-normal text-gray-800 bg-amber-200 rounded-md max-md:px-5 w-full"
                    style={{ background: theme.palette.secondary.main, letterSpacing: 4 }}
                  >
                    DAFTAR
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
                  navService.redirectUser(RoutesConfig.LoginPage.path());
                }}
                className="underline"
              >
                Login
              </a>
            </p>
          </div>
        </>
      }
    />
  );
}

export default withPageAuth(Register, { requiredAuth: false });
