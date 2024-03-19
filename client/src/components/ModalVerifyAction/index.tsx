import React from 'react';
import BaseModal from '../BaseModal';
import CloseIcon from '@material-ui/icons/Close';
import { ModalIDs } from '../../config/modalsConfig';
import { Box, Button, ButtonProps, Typography } from '@material-ui/core';
import { useModalAction } from '../../services/ModalProvider';

interface IModalVerifyActionProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action1?: React.ReactNode;
  action2?: React.ReactNode;
  action1Event?: () => void;
  action2Event?: () => void;
  action1Props?: Partial<Omit<ButtonProps, 'children' | 'onClick'>>;
  action2Props?: Partial<Omit<ButtonProps, 'children' | 'onClick'>>;
  entityName?: string;
}

const ModalVerifyAction = () => {
  const { close } = useModalAction();
  return (
    <BaseModal
      modalID={ModalIDs.MODAL_VERIFY_ACTION}
      showExitIcon={true}
      modalProps={{ fullWidth: true }}
      renderContent={(params: IModalVerifyActionProps) => (
        <>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem'
            }}
          >
            <Box
              style={{
                backgroundColor: '#FDF2F2',
                padding: '1rem',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <CloseIcon
                style={{
                  color: 'red',
                  fontSize: '3rem'
                }}
              />
            </Box>
            <Box>
              <Typography
                style={{
                  fontSize: '24px'
                }}
              >
                Are your sure ?
              </Typography>
            </Box>

            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography>
                Do you really want to delete these <span>{params?.entityName}</span> ?
              </Typography>
              <Typography>This process cannot be undone.</Typography>
            </Box>
          </Box>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              marginTop: '2rem'
            }}
          >
            <Button
              style={{
                color: '#fff',
                backgroundColor: '#C1C1C1',
                textTransform: 'none'
              }}
              onClick={() => {
                params.action2Event && params.action2Event();
                close(ModalIDs.MODAL_VERIFY_ACTION);
              }}
            >
              {params?.action2 ?? 'Cancel'}
            </Button>
            <Button
              style={{
                color: '#fff',
                backgroundColor: 'red',
                textTransform: 'none'
              }}
              onClick={() => {
                params.action1Event && params.action1Event();
                close(ModalIDs.MODAL_VERIFY_ACTION);
              }}
            >
              {params?.action1 ?? 'Delete'}
            </Button>
          </Box>
        </>
      )}
    />
  );
};

export default React.memo(ModalVerifyAction);
