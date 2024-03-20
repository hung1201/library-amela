import React from 'react';
import Footer from '../Footer';
import Header from '../Header';
import { ILayoutWrapperProps } from './types';

const LayoutWrapper = ({ children, config }: ILayoutWrapperProps) => {
  const header = config.BaseHeaderComponent ? <config.BaseHeaderComponent /> : <></>;
  const footer = config.FooterComponent ? <config.FooterComponent /> : <></>;
  const content = (
    <div className="flex flex-col justify-between">
      {header}
      <div className="flex-1">{children}</div>

      {footer}
    </div>
  );

  return <>{content}</>;
};

export default LayoutWrapper;
