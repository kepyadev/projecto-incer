import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundImage: 'url(/img/banner.png)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '600px',
      padding: theme.spacing(6, 14),
    },
    title: {
      textTransform: 'uppercase',
      fontWeight: 'bold',
      fontSize: theme.typography.h3.fontSize,
      color: 'white',
      marginBottom: theme.spacing(4),
    },
    button: {},

    [theme.breakpoints.down('xs')]: {
      root: {
        padding: theme.spacing(6, 2),
      },
    },
  })
);

export default useStyles;
