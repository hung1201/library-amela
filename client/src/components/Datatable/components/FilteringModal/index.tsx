import React from 'react';

import useStyles from './styles';
import { IProps as IDatatableProps } from '../../configuration';
import { useFieldsMenuDispatcher, useMenuIsVisible } from '../../provider';
import { IFilteringData } from '../../configuration';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
  useMediaQuery,
  useTheme
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';

interface IFilteringModalProps<T> {
  columns: IDatatableProps<T>['columns'];
  filteringData: {
    current: IFilteringData;
  };
  handleFiltering?: (resetForm: boolean) => void;
  resetFilteringAction: IDatatableProps<T>['resetFilteringAction'];
}

export default function FilteringModal<T>({
  columns,
  filteringData,
  handleFiltering,
  resetFilteringAction
}: IFilteringModalProps<T>) {
  const menuIsVisible = useMenuIsVisible();
  const setMenuVisible = useFieldsMenuDispatcher();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  return (
    <Dialog
      onClose={() => setMenuVisible(false)}
      aria-labelledby="simple-dialog-title"
      open={menuIsVisible && matches}
      fullScreen={matches}
      fullWidth
      style={{ marginTop: matches ? '20vh' : undefined }}
    >
      <DialogTitle id="simple-dialog-title">{'Filtering'}</DialogTitle>
      <DialogContent dividers>
        <Box display={'flex'} justifyContent="center" flexDirection="column">
          {columns
            .filter((headCell) => headCell.filtering)
            .map((headCell, index) => {
              return (
                <Box style={{ marginTop: '1rem', marginBottom: '1rem' }} key={index}>
                  <Typography style={{ fontSize: 17, fontWeight: 500 }}>
                    {headCell.label}
                    {':'}
                  </Typography>
                </Box>
              );
            })}
        </Box>
      </DialogContent>
      <DialogActions>
        {resetFilteringAction && (
          <Button
            autoFocus
            onClick={() => {
              resetFilteringAction();
              setMenuVisible(false);
            }}
            color="secondary"
          >
            {'Reset'}
          </Button>
        )}
        <Button autoFocus onClick={() => setMenuVisible(false)} color="primary">
          {'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
