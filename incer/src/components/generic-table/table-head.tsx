import { Divider, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { v4 } from 'uuid';

import { StyledTableCell } from './table.styles';
import { TableHeadProps } from './table.types';

const TableHead: FC<TableHeadProps> = ({ cells, hasOperation = false }) => {
  return (
    <thead>
      <tr
        style={{
          border: '1px solid rgba(0,0,0,0.1)',
          borderTop: 'none',
        }}
      >
        {cells.map(cell => (
          <StyledTableCell key={v4()} component="th" scope="row">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                textAlign: 'left',
              }}
            >
              <div style={{ flexGrow: 1 }}>
                <Typography variant="body1">{cell.label}</Typography>
              </div>
              <Divider
                orientation="vertical"
                style={{ height: '20px', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
              />
            </div>
          </StyledTableCell>
        ))}
        {hasOperation && <StyledTableCell colSpan={3}>Operações</StyledTableCell>}
      </tr>
    </thead>
  );
};

export default TableHead;
