import { Box, CircularProgress, CircularProgressProps, useTheme } from '@material-ui/core';
import * as React from 'react';

// Inspired by the former Facebook spinners.
function FacebookCircularProgress(props: CircularProgressProps) {
  const theme = useTheme();
  return (
    <Box sx={{ position: 'relative' }}>
      <CircularProgress
        variant="determinate"
        style={{
          color: theme.palette.divider
        }}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        style={{
          color: theme.palette.primary.main,
          animationDuration: '550ms',
          position: 'absolute',
          left: 0
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </Box>
  );
}

export default function LoadingView() {
  return <FacebookCircularProgress />;
}
