import LayoutWrapper from '../LayoutWrapper';
import { IConfig, NextPageWithLayout } from '../types';

export default function withPageLayout(config: IConfig): NextPageWithLayout['getLayout'] {
  const getLayout: NextPageWithLayout['getLayout'] = (page) => {
    return <LayoutWrapper config={config}>{page}</LayoutWrapper>;
  };

  return getLayout;
}
