import React, { ReactElement } from 'react';
import CloseIcon from '@material-ui/icons/Close';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentProps,
  DialogProps,
  DialogTitle,
  IconButton,
  useTheme
} from '@material-ui/core';
import { useModalAction, useModalData } from '../../services/ModalProvider';

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose?: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;
  const theme = useTheme();
  return (
    <DialogTitle style={{ margin: 0, padding: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey![500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

interface IModalProps extends Omit<DialogProps, 'open'> {
  onClose?: (
    event: Parameters<NonNullable<DialogProps['onClose']>>['0'],
    reason:
      | Parameters<NonNullable<DialogProps['onClose']>>['1']
      | 'exitIconClick'
      | 'manuallyClosed'
  ) => void;
}

interface IBaseModal {
  renderContent?: (props: any) => ReactElement;
  renderHeader?: (props: any) => ReactElement;
  renderFooter?: (props: any) => ReactElement;
  modalID: string;
  modalProps?: IModalProps;
  contentProps?: DialogContentProps;
  showExitIcon?: boolean;
}

export default function BaseModal({
  renderContent,
  renderHeader,
  renderFooter,
  modalID,
  modalProps = {},
  contentProps = {},
  showExitIcon = true
}: IBaseModal) {
  const { params, visible } = useModalData(modalID);
  const { close } = useModalAction();
  const open = visible;
  const [isManuallyClosed, setIsManuallyClosed] = React.useState(true);

  React.useEffect(() => {
    open && setIsManuallyClosed(open);
  }, [open]);

  const handleClose = () => {
    close(modalID);
  };
  return (
    <Dialog
      {...modalProps}
      TransitionProps={{
        onExit: () => {
          isManuallyClosed && modalProps?.onClose && modalProps?.onClose({}, 'manuallyClosed');
        }
      }}
      onClose={(event, reason) => {
        setIsManuallyClosed(false);
        modalProps?.onClose && modalProps?.onClose(event, reason);
        handleClose();
      }}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      {renderHeader && (
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={() => {
            if (showExitIcon) {
              setIsManuallyClosed(false);
              modalProps?.onClose && modalProps?.onClose({}, 'exitIconClick');
              handleClose();
            }
          }}
        >
          {renderHeader(params)}
        </BootstrapDialogTitle>
      )}
      {renderContent && (
        <DialogContent dividers {...contentProps}>
          {renderContent(params)}
        </DialogContent>
      )}
      {renderFooter && <DialogActions>{renderFooter(params)}</DialogActions>}
    </Dialog>
  );
}
