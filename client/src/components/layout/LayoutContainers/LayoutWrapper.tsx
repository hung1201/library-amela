import React from 'react';
import Footer from '../Footer';
import Header from '../Header';
import { ILayoutWrapperProps } from './types';

const LayoutWrapper = ({ children, config }: ILayoutWrapperProps) => {
  console.log('config<>', config);
  const content = (
    <div className="flex flex-col h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );

  return <>{content}</>;
};

export default LayoutWrapper;
