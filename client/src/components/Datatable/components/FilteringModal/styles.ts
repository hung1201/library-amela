import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  filterModal: {
    position: 'absolute',
    right: '0',
    height: '90%',
    width: '100%',
    bottom: 0,
    '& .title-filter': {
      marginBottom: 15
    }
  }
}));

export default useStyles;
