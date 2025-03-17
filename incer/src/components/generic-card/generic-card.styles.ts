import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '90%',
      borderRadius: 20,
      padding: theme.spacing(4, 2),
      margin: theme.spacing(4, 2),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
    title: {
      fontSize: theme.typography.h6.fontSize,
      fontWeight: 400,
    },
  })
);

export default useStyles;
