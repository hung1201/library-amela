import React from 'react';
import AuthContainer from '../../../components/AuthContainer';
import { useTheme } from '@material-ui/core';
import NavService from '../../../services/Nav.service';
import { Field, Form, Formik, FormikProps } from 'formik';
import FetchService from '../../../services/Fetch.service';
import { notistack } from '../../../utils/notistack';
import RoutesConfig from '../../../config/routesConfig';

type Props = {};

const ForgotPassword = (props: Props) => {
  const navService = new NavService();
  const theme = useTheme();
  return (
    <AuthContainer
      backgroundImageUrl="https://s3-alpha-sig.figma.com/img/0555/8084/d65c04a52ef78dca66bd0c332ffaaa42?Expires=1711929600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UGIeru0UU9H-LErBzhLXtc2ZEspM7Qmb-SEWsUhoosJXMnwGGFxVJRAh5XHob5qlK8RaCfPQTTsDYNyi0OHhgOdMmG6vVYjR2ac5AMeZVjHufQRhOhBuXjXetvETYj2IyMf35Ark6vvXfsjCXifSy4TP0aAOgoCi5u8-RSgsAcb0LoRQRAIUwBO88vV4YCisM6-GMlpuB2k9I5KsWhJM9Zjg4JPHLqAbmuNdG7PRhEfU32hvW7cc48NQyFYNqfryKAeX6Qpb94z~c74ggV~SmcdDiLl-7Gi-hn4zLdnRDrMc4JYg9I2NxUpOokRHsRiCWk-1CFGfwXPhv3HMFT0Yvg__"
      form={
        <>
          <div className="flex flex-col mt-2 max-w-full w-[432px]">
            <h2 className="text-3xl font-semibold tracking-normal leading-10 text-white max-md:max-w-full">
              Forgot Password
            </h2>
            <p className="mt-7 leading-6 max-md:max-w-full text-white">
              Persiapkan diri untuk masa depan yang penuh dengan bintang
            </p>
            <Formik
              validate={(values) => {
                const errors = { email: '' };
                if (!values.email) {
                  errors.email = 'Required';
                }
                const checkErrorsEmpty = Object.values(errors).filter((x) => x);
                if (checkErrorsEmpty.length > 0) {
                  return errors;
                }
              }}
              initialValues={{
                email: ''
              }}
              onSubmit={(
                values: { email: string },
                { setSubmitting }: FormikProps<{ email: string }>
              ) => {
                FetchService.isofetch(
                  '/auth/forgot-password',
                  {
                    email: values.email
                  },
                  'POST'
                )
                  .then((res: { success: boolean; message: string }) => {
                    setSubmitting(false);
                    if (res.success) {
                      notistack.success(res.message);
                      return;
                    }
                    throw new Error("Couldn't send email");
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
            <p className="self-center mt-2 text-lg flex gap-1 tracking-normal text-white underline">
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
};

export default ForgotPassword;
