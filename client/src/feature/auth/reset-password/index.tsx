import { useTheme } from '@material-ui/core';
import { NextPageWithLayout } from '../../../components/layout/LayoutContainers';

import { Field, Form, Formik, FormikProps } from 'formik';
import AuthContainer from '../../../components/AuthContainer';
import withPageAuth from '../../../middleware/withPageAuth';
import NavService from '../../../services/Nav.service';
import RoutesConfig from '../../../config/routesConfig';
import FetchService from '../../../services/Fetch.service';
import { useRouter } from 'next/router';
import { notistack } from '../../../utils/notistack';
type Props = {};

const ResetPassword = (props: Props) => {
  const router = useRouter();
  const navService = new NavService();
  const theme = useTheme();
  return (
    <AuthContainer
      backgroundImageUrl="https://s3-alpha-sig.figma.com/img/0555/8084/d65c04a52ef78dca66bd0c332ffaaa42?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UGIeru0UU9H-LErBzhLXtc2ZEspM7Qmb-SEWsUhoosJXMnwGGFxVJRAh5XHob5qlK8RaCfPQTTsDYNyi0OHhgOdMmG6vVYjR2ac5AMeZVjHufQRhOhBuXjXetvETYj2IyMf35Ark6vvXfsjCXifSy4TP0aAOgoCi5u8-RSgsAcb0LoRQRAIUwBO88vV4YCisM6-GMlpuB2k9I5KsWhJM9Zjg4JPHLqAbmuNdG7PRhEfU32hvW7cc48NQyFYNqfryKAeX6Qpb94z~c74ggV~SmcdDiLl-7Gi-hn4zLdnRDrMc4JYg9I2NxUpOokRHsRiCWk-1CFGfwXPhv3HMFT0Yvg__"
      form={
        <>
          <div className="flex flex-col mt-2 max-w-full w-[432px]">
            <h2 className="text-3xl font-semibold tracking-normal leading-10 text-white max-md:max-w-full">
              Reset password
            </h2>
            <p className="mt-7 leading-6 max-md:max-w-full text-white">
              Persiapkan diri untuk masa depan yang penuh dengan bintang
            </p>
            <Formik
              validate={(values) => {
                const errors = { password: '', confirmPassword: '' };
                if (!values.password) {
                  errors.password = 'Required';
                }
                if (values.password.length < 8) {
                  errors.password = 'Password must be at least 8 characters';
                }
                if (!values.confirmPassword) {
                  errors.confirmPassword = 'Required';
                }
                if (values.confirmPassword.length < 8) {
                  errors.confirmPassword = 'Password must be at least 8 characters';
                }
                if (values.password !== values.confirmPassword) {
                  errors.confirmPassword = 'Password not match';
                }
                const checkErrorsEmpty = Object.values(errors).filter((x) => x);
                if (checkErrorsEmpty.length > 0) {
                  return errors;
                }
              }}
              initialValues={{
                email: router?.query?.email ?? '',
                password: '',
                confirmPassword: ''
              }}
              onSubmit={(
                values,
                {
                  setSubmitting
                }: FormikProps<{
                  email: string;
                  password: string;
                  confirmPassword: string;
                }>
              ) => {
                FetchService.isofetch(
                  '/auth/reset-password',
                  {
                    email: router?.query?.email,
                    password: values.password,
                    confirmPassword: values.confirmPassword
                  },
                  'POST'
                )
                  .then((res) => {
                    setSubmitting(false);
                    if (res.success) {
                      notistack.success('Reset password success');
                      navService.redirectUser(RoutesConfig.LoginPage.path());
                      return;
                    }
                    throw new Error('Reset password failed');
                  })
                  .catch((err: Error) => {
                    notistack.error(err.message);
                  });
              }}
              render={({ values, errors, touched }) => (
                <Form autoComplete="off">
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
                      value={router.query?.email ?? ''}
                      disabled={router.query?.email ? true : false}
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      aria-label="Email"
                      className={`w-full bg-transparent focus:outline-none text-white ${
                        errors.email && touched.email ? 'text-red-500' : ''
                      }`}
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
                    <label htmlFor="email" className="sr-only">
                      Password
                    </label>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      aria-label="Password"
                      className={`w-full bg-transparent focus:outline-none text-white ${
                        errors.password && touched.password ? 'text-red-500' : ''
                      }`}
                      autoComplete="off"
                    />
                  </div>
                  {errors.password && touched.password ? (
                    <div className="text-red-500">{errors.password}</div>
                  ) : null}
                  <div
                    className={`justify-center items-start px-8 py-7 mt-4 whitespace-nowrap rounded-lg border-2 border-solid ${
                      errors.confirmPassword && touched.confirmPassword
                        ? 'border-red-500'
                        : 'border-white border-opacity-10'
                    } max-md:px-5 max-md:max-w-full`}
                  >
                    <label htmlFor="confirmPassword" className="sr-only">
                      Confirm Password
                    </label>
                    <Field
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      aria-label="Confirm Password"
                      className={`w-full bg-transparent focus:outline-none text-white ${
                        errors.confirmPassword && touched.confirmPassword ? 'text-red-500' : ''
                      }`}
                      autoComplete="off"
                    />
                  </div>
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div className="text-red-500">{errors.confirmPassword}</div>
                  ) : null}
                  <button
                    type="submit"
                    className="justify-center items-center px-16 py-7 mt-10 text-lg font-bold tracking-normal text-gray-800 bg-amber-200 rounded-md max-md:px-5 w-full"
                    style={{ background: theme.palette.secondary.main, letterSpacing: 4 }}
                  >
                    MUSK
                  </button>
                </Form>
              )}
            />
          </div>
        </>
      }
    />
  );
};

export default ResetPassword;
