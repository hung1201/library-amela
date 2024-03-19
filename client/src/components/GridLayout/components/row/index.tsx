import { Grid, Theme } from '@material-ui/core';
import React, { ReactElement } from 'react';

interface IRowProps {
  widthInXLargeScreen?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  widthInMediumScreen?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  widthInLargeScreen: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  widthInSmallScreen?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  widthInXSmallScreen?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  children: ReactElement;
}

export default function Row(props: IRowProps): ReactElement {
  return (
    <Grid
      xl={props.widthInXLargeScreen || props.widthInLargeScreen}
      lg={props.widthInLargeScreen}
      md={props.widthInMediumScreen || props.widthInLargeScreen}
      xs={props.widthInXSmallScreen || 12}
      sm={props.widthInSmallScreen || 12}
      item
    >
      {props.children}
    </Grid>
  );
}
