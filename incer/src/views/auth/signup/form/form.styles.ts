import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2, 6),

      // smarth phone
      [theme.breakpoints.up('xs')]: {
        padding: theme.spacing(2, 4),
      },

      // tablet
      [theme.breakpoints.up('sm')]: {},

      // Laptop
      [theme.breakpoints.up('md')]: {
        textAlign: 'left',
        width: '85%',
      },
      width: '100%',
    },
  })
);

export default useStyles;
