import { Field, Form, Formik, FormikProps } from 'formik';

import FetchService from '../../services/Fetch.service';
import { useGlobalMessaging } from '../../services/GlobalMessaging.context';

import AuthContainer from '../../components/AuthContainer';
import withPageAuth from '../../middleware/withPageAuth';
import NavService from '../../services/Nav.service';
import { IRegisterIn } from '../../types/auth.types';

interface IProps {}

function Register(props: IProps) {
  const [messageState, messageDispatch] = useGlobalMessaging();
  const navService = new NavService();
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
                <Form autoComplete="off">
                  <div className="justify-center items-start px-8 py-7 mt-6 rounded-lg border-2 border-solid border-white border-opacity-10 max-md:px-5 max-md:mt-10 max-md:max-w-full">
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
                      style={{ backgroundColor: 'transparent' }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="justify-center items-center px-16 py-7 mt-10 text-lg font-bold tracking-normal text-gray-800 bg-amber-200 rounded-md max-md:px-5 w-full"
                    style={{ background: '#FCD980', letterSpacing: 4 }}
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
                  navService.redirectUser('/login');
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
