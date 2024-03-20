import css from './PageContent.module.scss';

import Header from '../Header';

import * as React from 'react';

function PageContent({ children }: any) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default PageContent;
