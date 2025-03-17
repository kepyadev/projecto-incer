import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      color: '#fff',
      padding: theme.spacing(2, 6),

      width: '100%',

      // smarth phone
      [theme.breakpoints.up('xs')]: {
        padding: theme.spacing(2, 4),
      },

      // tablet
      [theme.breakpoints.up('sm')]: {},

      // Laptop
      [theme.breakpoints.up('md')]: {
        textAlign: 'left',
        width: '100%',
      },
    },
    title: {
      fontSize: '36pt',
      fontWeight: 'bold',
      marginBottom: theme.spacing(8),
    },
    link: {
      color: '#fff',
    },
    rememberMe: {
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(2),
      },
      textAlign: 'left',
    },
    forgetPassword: {
      [theme.breakpoints.up('md')]: {
        paddingTop: '28px',
      },
      paddingTop: theme.spacing(4),
      textAlign: 'right',
    },
  })
);

export default useStyles;
