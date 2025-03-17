import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#F0F0F0',
      padding: theme.spacing(3),
    },
    item: {
      color: theme.palette.secondary.main,
      fontWeight: 'bold',
      textDecoration: 'none',
    },
    active: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
    },
  })
);

export default useStyles;
