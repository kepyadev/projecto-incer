import {
  Dialog,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import React, { FC } from 'react';

import { styles } from './generic-modal.styles';
import { GenericModalProps } from './generic-modal.types';

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  title: string;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { title, classes, onClose, ...other } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <div>
        <div className={classes.titleContainer}>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
        </div>
      </div>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2, 8),
    width: '900px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}))(MuiDialogContent);

const GenericModal: FC<GenericModalProps> = ({ children, onClose, open, title }) => {
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby={`dialog-${title}`}
      open={open}
      maxWidth="lg"
      style={{ width: '100%' }}
    >
      <DialogTitle id={`dialog-${title}`} onClose={onClose} title={title} />
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

export default GenericModal;
