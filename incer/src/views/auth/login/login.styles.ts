import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundImage: 'url(/img/produtor.png)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '100vh',
    },
    leftSide: {},
  })
);

export default useStyles;
