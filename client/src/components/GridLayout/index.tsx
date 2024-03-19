import React, { ReactElement } from 'react';
import Row from './components/row';
import { Grid } from '@material-ui/core';

type TSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type TSpacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | undefined;

interface IElement {
  size: TSize;
  xl?: TSize;
  md?: TSize;
  sm?: TSize;
  xs?: TSize;
  element: ReactElement;
  id: string;
}

export interface IElementsProps {
  size: TSize; // lg
  xl?: TSize;
  md?: TSize;
  sm?: TSize;
  xs?: TSize;
  element: ReactElement | IElement[];
  id: string;
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  justify?: 'center' | 'flex-start' | 'space-between' | 'flex-end';
}

export interface IGridLayoutProps {
  elements: IElementsProps[];
  justify?: 'center' | 'flex-start' | 'space-between' | 'flex-end';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  spacing?: TSpacing;
  style?: React.CSSProperties;
}

export default function GridLayout(props: IGridLayoutProps): ReactElement {
  const { style = {} } = props;

  return (
    <Grid
      container
      justifyContent={props.justify ?? 'center'}
      alignItems={props.align ?? 'center'}
      style={style}
      spacing={props.spacing ?? 1}
    >
      {props.elements.map((_props) => (
        <Row
          key={_props.id}
          widthInXLargeScreen={_props.xl}
          widthInLargeScreen={_props.size}
          widthInMediumScreen={_props.md}
          widthInSmallScreen={_props.sm}
          widthInXSmallScreen={_props.xs}
        >
          {Array.isArray(_props.element as any) ? (
            <Grid container justifyContent={_props.justify ?? 'center'}>
              {(_props.element as any).map((element: IElement) => (
                <Row
                  key={element.id}
                  widthInLargeScreen={element.size}
                  widthInMediumScreen={element.md}
                  widthInSmallScreen={_props.sm}
                  widthInXSmallScreen={_props.xs}
                >
                  {element.element}
                </Row>
              ))}
            </Grid>
          ) : (
            (_props.element as any)
          )}
        </Row>
      ))}
    </Grid>
  );
}
