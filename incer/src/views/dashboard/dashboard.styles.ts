import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const drawerWidth = 230;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      // top: 0,
      // left: 'auto',
      // position: 'fixed',
      right: 'auto',
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth * 2}px)`,
        marginLeft: `${drawerWidth}px`,
      },
      width: '100%',
    },

    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    appBarShiftRight: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginRight: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },

    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    hanburguerIcon: {
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    content: {
      width: `calc(100% - ${drawerWidth * 1}px)`,
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(3),
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  })
);

export default useStyles;
