import { Field, Form, Formik, FormikProps } from 'formik';

import PageContent from '../../components/PageContent';

import FetchService from '../../services/Fetch.service';
import { useGlobalMessaging } from '../../services/GlobalMessaging.context';

import { useRouter } from 'next/router';
import withPageAuth from '../../middleware/withPageAuth';
import { useAuth } from '../../services/Auth.context';
import NavService from '../../services/Nav.service';
import TokenService from '../../services/Token.service';
import { ILoginIn, ILoginOutput } from '../../types/auth.types';
import BackButton from '../../components/BackButton';
import { useTheme } from '@material-ui/core';
type Props = {
  backgroundImageUrl?: string;
  form?: React.ReactNode;
};

const AuthContainer = (props: Props) => {
  const theme = useTheme();
  return (
    <PageContent>
      <div className="h-full p-16 flex flex-col items-start gap-3">
        <BackButton />
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
            <section
              className="flex w-full md:w-6/12"
              style={{ background: theme.palette.primary.main }}
            >
              <div className="flex justify-center py-12 px-10 items-center w-full text-base leading-6 text-slate-100 max-md:px-5 max-md:max-w-full">
                {props.form}
              </div>
            </section>
          </div>
        </main>
      </div>
    </PageContent>
  );
};

export default AuthContainer;
