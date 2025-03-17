import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(0, 2),
      paddingTop: theme.spacing(2),
      display: 'flex',
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    titleContainer: {
      flexGrow: 1,
      width: 'auto',
    },
    title: {
      padding: theme.spacing(0, 4),
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
  });

const useStyles = makeStyles(
  () =>
    createStyles({
      dialog: {},
    }),
  { index: 1 }
);

export default useStyles;
