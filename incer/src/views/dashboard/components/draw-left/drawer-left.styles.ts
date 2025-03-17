import { createStyles, makeStyles, Theme } from '@material-ui/core';

const drawerWidth = 230;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('md')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: '#F6F6F6',
    },

    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'center',
      marginBottom: theme.spacing(4),

      width: drawerWidth - 40,
      marginLeft: 20,
    },
    logo: {
      maxHeight: '50px',
    },
  })
);

export default useStyles;
