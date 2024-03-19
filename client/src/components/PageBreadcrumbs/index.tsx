import { Breadcrumbs, BreadcrumbsProps, Typography, Link as MuiLink } from '@material-ui/core';
import React from 'react';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Link from 'next/link';
export interface IPath {
  label: React.ReactNode;
  href: string | null;
}

export interface IPageBreadcrumbsProps<T = {}> extends BreadcrumbsProps {
  paths: IPath[];
  underline?: 'none' | 'hover' | 'always';
  activeLastBreadcrumb?: boolean;
}

const BreadcrumbsContainer = ({
  paths,
  underline,
  activeLastBreadcrumb,
  ...otherProps
}: IPageBreadcrumbsProps) => {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" {...otherProps} separator={<NavigateNextIcon />}>
        {paths?.map((path, index) => {
          const last = index === paths.length - 1;
          return (last && !activeLastBreadcrumb) || !path?.href ? (
            <Typography style={{ color: '#282938', cursor: 'pointer' }} key={index}>
              {path?.label}
            </Typography>
          ) : (
            <Link href={path?.href} key={index}>
              <Typography style={{ color: '#282938', cursor: 'pointer' }} key={index}>
                {path?.label}
              </Typography>
            </Link>
          );
        })}
      </Breadcrumbs>
    </>
  );
};

export default BreadcrumbsContainer;
