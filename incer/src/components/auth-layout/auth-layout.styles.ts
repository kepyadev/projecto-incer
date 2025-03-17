import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // paddingTop: '60px',
      color: '#fff',
      overflow: 'scroll',
      height: '100vh',
      padding: theme.spacing(4, 12),

      [theme.breakpoints.down('md')]: {
        padding: theme.spacing(2, 1),
      },
    },
    leftSide: {
      // with: '50%',
      // paddingLeft: theme.spacing(8),
    },
    rigthSide: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      // with: '50%',
      padding: theme.spacing(8),
      overflowX: 'scroll',

      [theme.breakpoints.down('md')]: {
        padding: theme.spacing(1),
      },
    },
    title: {
      fontSize: '36pt',
      fontWeight: 'bold',
      marginBottom: theme.spacing(3),
    },
    containerTitle: {
      padding: theme.spacing(1, 4),
    },
  })
);

export default useStyles;
