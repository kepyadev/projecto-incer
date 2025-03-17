import { createStyles, makeStyles, Theme } from '@material-ui/core';

const width = '80px';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconContainer: {
      // marginLeft: `calc(50% - 80px/2)`,
      width,
      height: width,
      marginBottom: theme.spacing(2),
      borderRadius: '10px',
      padding: theme.spacing(2, 3),
      boxShadow: '4px 5px 10px 1px rgba(0, 0, 0, 0.2)',
      display: 'flex',
    },
    buttonBox: {
      textTransform: 'initial',
      width: '100%',
    },
    button: {
      width: '50%',
      marginBottom: '10px',
    },
  })
);

export default useStyles;
