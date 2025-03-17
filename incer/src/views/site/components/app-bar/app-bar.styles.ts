import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    appBar: {
      padding: theme.spacing(0, 9),
      justifyContent: 'center',
      backgroundColor: '#fff',
    },

    menu: {},
    buttonWithoutBorder: {
      borderRadius: '0px !important',
    },

    [theme.breakpoints.down('sm')]: {
      appBar: {
        padding: theme.spacing(0, 1),
      },
      toolbar: {
        flexWrap: 'wrap',
      },
      menu: {
        display: 'flex',
        width: '100%',
      },
    },
    toolbar: {},
  })
);

export default useStyles;
