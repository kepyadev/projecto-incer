import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'rgba(96,97,97,0.4)',
      padding: theme.spacing(4, 2),
    },
    logotipoItem: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: '16px !important',
      borderRight: '2px solid rgba(0,0,0,0.1)',
    },
    title: {
      fontWeight: 'bold',
      marginBottom: theme.spacing(1),
      color: '#200E32',
    },
    'MuiGrid-item': {
      paddingLeft: '32px !important',
      borderRight: '2px solid rgba(0,0,0,0.1)',
    },
    footerBar: {
      backgroundColor: 'rgba(96,97,97,0.78)',
      padding: theme.spacing(2),
    },
  })
);

export default useStyles;
