import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'end',
      padding: theme.spacing(1),
    },
    textContainer: {
      flex: 2,
    },
    imgContainer: {
      flex: 1,
      backgroundColor: '#fff',
      height: '65px',
      borderRadius: 10,
      boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: theme.spacing(3),
    },
  })
);

export default useStyles;
