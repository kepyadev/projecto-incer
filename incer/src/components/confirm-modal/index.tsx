import { Box, Button, Typography } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import React, { FC } from 'react';

import GenericModal from '../generic-modal';
import useStyles from './confirm-modal.styles';
import { ConfirmModalProps } from './confirm-modal.types';

const ConfirmModal: FC<ConfirmModalProps> = ({ text, open, action, onClose }) => {
  const classes = useStyles();
  return (
    <GenericModal title="Confirmação" onClose={onClose} open={open}>
      <Box className={classes.root}>
        <div className={classes.iconContainer}>
          <InfoOutlinedIcon fontSize="large" />
        </div>
        <div style={{ flexGrow: 1 }}>
          <Typography variant="body1">{text}</Typography>
        </div>
      </Box>
      <Box className={classes.actionsContainer}>
        {/*  <Button
          onClick={onClose}
          variant="contained"
          color="secondary"
          size="small"
          className={classes.buttonCancel}
        >
          Cancelar
        </Button> */}
        <Button
          onClick={action}
          variant="contained"
          color="primary"
          size="small"
          className={classes.buttonConfirm}
        >
          Confirmar
        </Button>
      </Box>
    </GenericModal>
  );
};

export default ConfirmModal;
