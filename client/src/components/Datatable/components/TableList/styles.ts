import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  stickyRight: {
    position: 'sticky',
    right: 0,

    boxShadow: '9px 7px 29px -10px rgba(153,153,153,1)',

    zIndex: 1,
    background: theme.palette?.background.paper,
    top: 0
  },
  stickyLeft: {
    position: 'sticky',
    left: 0,

    boxShadow: '9px 7px 29px -10px rgba(153,153,153,1)',
    zIndex: 1,
    background: theme.palette?.background.paper
  }
}));

export default useStyles;
