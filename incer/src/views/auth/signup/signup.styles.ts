import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      backgroundImage: 'url(/img/rectangle.png)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  })
);

export default useStyles;
