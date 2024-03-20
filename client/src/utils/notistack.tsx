'use client';
import ReactDOM from 'react-dom';
import { SnackbarKey, SnackbarProvider, useSnackbar } from 'notistack';

export const notistack = {
  success: function (msg: string) {
    this.toast(msg, 'success');
  },
  warning: function (msg: string) {
    this.toast(msg, 'warning');
  },
  info: function (msg: string) {
    this.toast(msg, 'info');
  },
  error: function (msg: string) {
    this.toast(msg, 'error');
  },
  toast: function (
    msg: string,
    variant = 'default',
    actionComponent = (key: SnackbarKey, callback: (key: SnackbarKey) => void) => {},
    persist = false,
    onExited = () => {},
    anchor
  ) {
    const ShowSnackbar = ({ message, variant }) => {
      const { enqueueSnackbar, closeSnackbar } = useSnackbar();
      enqueueSnackbar(message, {
        variant,
        action: (key: SnackbarKey) => actionComponent(key, closeSnackbar),
        persist,
        onExited
      });
      return null;
    };
    const mountPoint = document.createElement('snackbar-helper');
    document.body.appendChild(mountPoint);
    ReactDOM.render(
      <SnackbarProvider
        autoHideDuration={3000}
        maxSnack={2}
        disableWindowBlurListener={true}
        anchorOrigin={anchor || { horizontal: 'center', vertical: 'top' }}
      >
        <ShowSnackbar message={msg} variant={variant} />
      </SnackbarProvider>,
      mountPoint
    );
  }
};
