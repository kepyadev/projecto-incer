import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(
  theme => ({
    inputGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(2),
      justifyContent: 'space-between',
      marginBottom: theme.spacing(1),
      textAlign: 'center',
    },
    formInput: {
      flex: 1,
      '& > div': {
        width: '100%',
      },
    },
  }),
  { index: 1 }
);

export default useStyles;
