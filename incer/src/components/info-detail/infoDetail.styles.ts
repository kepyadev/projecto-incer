import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles(
  (theme: Theme) => ({
    infoHeader: {
      fontWeight: 500,
      color: theme.palette.grey[500],
    },
    infoDescription: {
      fontWeight: 500,
      color: theme.palette.grey[700],
    },
    pageMainInfo: {
      display: 'flex',
      flexDirection: 'row',
      gap: '10px',
    },
  }),
  { index: 1 }
);

export default useStyles;
