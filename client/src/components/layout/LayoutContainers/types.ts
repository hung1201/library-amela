import React from 'react';
import { ILayoutConfig, LAYOUT_CONFIG } from './layoutMedia';

export interface ILayoutWrapperProps {
  children?: React.ReactNode;
  config: IConfig;
}
export type NextPageWithLayout = React.FC<{
  children?: React.ReactNode;
  [key: string]: any;
}> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};
export interface IConfig {
  FooterComponent?: React.FC<IPageLayoutProps>;

  BaseHeaderComponent?: React.FC<IPageLayoutProps & { [key: string]: any }>;
}
export interface IPageLayoutProps {
  children?: React.ReactNode;
  Component?: React.FC;
}
