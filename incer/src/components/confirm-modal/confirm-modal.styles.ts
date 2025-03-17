import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '700px',
      marginBottom: theme.spacing(3),
      padding: theme.spacing(3),
      display: 'flex',
      flexDirection: 'row',
    },
    iconContainer: { marginRight: '16px' },
    buttonCancel: {
      width: '30%',
      marginRight: '10px',
    },
    buttonConfirm: {
      width: '30%',
    },
    actionsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      margin: theme.spacing(2),
    },
  })
);

export default useStyles;
