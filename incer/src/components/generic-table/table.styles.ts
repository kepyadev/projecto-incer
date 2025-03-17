import {
  createStyles,
  makeStyles,
  TableCell,
  TableRow,
  Theme,
  withStyles,
} from '@material-ui/core';

export const StyledTableCell = withStyles(() =>
  createStyles({
    head: {},
    body: {
      fontSize: 14,
    },
  })
)(TableCell);

export const StyledTableRow = withStyles(() =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {},
    },
  })
)(TableRow);

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 700,
    },
    overTable: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '16px',
      border: '1px solid rgba(0,0,0,0.1)',
      marginBottom: '-1px',
      backgroundColor: '#fff',
      color: 'rgba(0,0,0,0.4)',
    },
    pageOption: {},

    [theme.breakpoints.down('xs')]: {
      pageOption: {
        flexWrap: 'wrap',
        '& div': {
          marginBottom: '10px',
          flex: 1,
          margin: 0,
          padding: theme.spacing(0, 1),
          '& button': {
            width: '100%',
          },
        },
      },
    },
  })
);
