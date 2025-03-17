import {
  createStyles,
  makeStyles,
  TableCell,
  TableRow,
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

export const useStyles = makeStyles({
  table: {
    width: '100%',
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
});
