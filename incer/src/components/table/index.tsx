import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import React, { FC, useCallback, useState } from 'react';
import { v4 } from 'uuid';

import TableHead from '../generic-table/table-head';
import NotData from '../not-data';
import { StyledTableCell, StyledTableRow, useStyles } from './table.styles';
import { RowsPerPageValues, TableWithouFetcherProps } from './table.types';

const TableWithoutFetcher: FC<TableWithouFetcherProps> = ({
  rows,
  entityName,
  cells,
  height,
  onCreate,
  onSelectOne,
  primaryKey,
  title,
  dataModifier,
}) => {
  const classes = useStyles();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(RowsPerPageValues[0]);

  const modifiedData = dataModifier ? dataModifier(rows) : rows;

  const count = modifiedData.length;

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(event.target.value as number);
  };

  const handleChangePage = useCallback((_event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleSelectOne = (id: string) => {
    if (onSelectOne) onSelectOne(id);
  };

  return (
    <>
      <div>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent={title ? 'space-between' : 'flex-end'}
          alignItems="center"
          style={{
            paddingBottom: '16px',
          }}
        >
          {title && <Typography variant="h5">{title}</Typography>}
          {onCreate && (
            <Button
              color="primary"
              variant="contained"
              disableElevation
              style={{
                backgroundColor: '#8CDBAC',
                padding: '0px 40px',
                height: '32px',
              }}
              size="small"
              onClick={onCreate}
            >
              Adicionar Novo
              <AddBoxIcon style={{ marginLeft: '15px' }} />
            </Button>
          )}
        </Box>
        <div className={classes.overTable}>
          <Box
            style={{ flexGrow: 5 }}
            display="flex"
            alignItems="center"
            justifyItems="space-around"
          >
            <Typography variant="body1">
              Mostrando {count < rowsPerPage ? count : rowsPerPage} de {count}
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyItems="space-around"
            style={{
              justifyContent: 'space-around',
              flexGrow: 1,
            }}
          >
            <Typography variant="body1">Resultado por página</Typography>
            <FormControl variant="outlined">
              <Select
                labelId="rows-per-page-label"
                id="rows-per-page"
                value={rowsPerPage}
                defaultValue={RowsPerPageValues[0]}
                onChange={handleChangeRowsPerPage}
                fullWidth
                style={{ height: '40px' }}
              >
                {RowsPerPageValues.map(value => (
                  <MenuItem value={value} key={v4()}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
        <TableContainer style={{ height: height || '45vh' }}>
          <Table className={classes.table} aria-label={`${entityName}-table`}>
            <TableHead cells={cells} hasOperation={false} />
            {count !== 0 && (
              <TableBody
                style={{ borderCollapse: 'separate', borderSpacing: '0 8px' }}
              >
                <tr
                  style={{
                    backgroundColor: 'white',
                    marginBottom: '10px',
                    height: '10px',
                  }}
                />
                {modifiedData ? (
                  modifiedData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <StyledTableRow
                        key={v4()}
                        style={
                          index % 2
                            ? { background: 'rgb(239, 243, 246)' }
                            : { background: 'white' }
                        }
                        onClick={() => {
                          if (primaryKey) handleSelectOne(row[primaryKey]);
                        }}
                      >
                        {cells.map(cell => (
                          <StyledTableCell
                            style={{
                              textAlign: cell.numeric ? 'right' : 'center',
                              paddingRight: '32px',
                            }}
                            key={v4()}
                          >
                            <Typography variant="body1">
                              {Object.keys(row).includes(cell.id)
                                ? row[cell.id]
                                : '-'}
                            </Typography>
                          </StyledTableCell>
                        ))}
                      </StyledTableRow>
                    ))
                ) : (
                  <NotData />
                )}
              </TableBody>
            )}
          </Table>
          {count === 0 && <NotData />}
        </TableContainer>
        <TablePagination
          rowsPerPage={rowsPerPage}
          page={page}
          count={count || 0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          component="div"
          rowsPerPageOptions={[]}
        />
      </div>
    </>
  );
};

export default TableWithoutFetcher;
