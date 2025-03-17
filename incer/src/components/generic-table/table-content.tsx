import { IconButton, TableBody, Typography } from '@material-ui/core';
import { DeleteOutline, EditOutlined } from '@material-ui/icons';
import React, { FC, useEffect, useState } from 'react';
import { v4 } from 'uuid';

import useAsyncState from '../../hooks/use-async-state';
import ConfirmModal from '../confirm-modal';
import SnackMessage from '../snack-message';
import { StyledTableCell, StyledTableRow } from './table.styles';
import { TableContentProps } from './table.types';

const TableContent: FC<TableContentProps> = ({
  rows,
  cells,
  onDelete,
  primaryKey,
  entityName,
  setOpenEdit,
  onSelectOne,
  page,
  rowsPerPage,
}) => {
  const [open, setOpen] = useState(false);
  const [activeLine, setActiveLine] = useState<string>('');
  const { snackMessage, setSnackMessage } = useAsyncState();

  useEffect(() => {
    localStorage.setItem('active_item', activeLine);
  }, [activeLine]);

  const handleDelete = () => {
    if (onDelete)
      onDelete(activeLine)
        .then(() => {
          setSnackMessage({ isError: false, message: `${entityName} removida!` });
        })
        .catch(() => {
          setSnackMessage({
            isError: true,
            message: `Lamentamos, ocorreu um erro ao remover a(o) ${entityName}!`,
          });
        })
        .finally(() => {
          setOpen(false);
        });
  };

  const handleEdit = () => {
    if (setOpenEdit) {
      setOpenEdit(true);
    }
  };

  const handleSelectOne = (id: string) => {
    if (onSelectOne) onSelectOne(id);
  };
  return (
    <TableBody
      style={{ borderCollapse: 'separate', borderSpacing: '0 8px' }}
      id="tabler"
    >
      <tr
        style={{
          backgroundColor: 'white',
          marginBottom: '10px',
          height: '10px',
          cursor: 'pointer',
        }}
      />
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => (
          <StyledTableRow
            key={v4()}
            style={
              index % 2
                ? { background: 'rgb(239, 243, 246)' }
                : { background: 'white' }
            }
          >
            {cells.map(cell => (
              <StyledTableCell
                style={{
                  textAlign: cell.numeric ? 'right' : 'left',
                  paddingRight: '32px',
                  cursor: 'pointer',
                }}
                onClick={() => handleSelectOne(row[primaryKey] as string)}
                key={v4()}
              >
                <Typography variant="body1">{row[cell.id] as string}</Typography>
              </StyledTableCell>
            ))}

            {setOpenEdit && (
              <StyledTableCell>
                <IconButton
                  onClick={() => {
                    setActiveLine(row[primaryKey] as string);
                    handleEdit();
                  }}
                >
                  <EditOutlined />
                </IconButton>
              </StyledTableCell>
            )}

            {onDelete && (
              <StyledTableCell>
                <IconButton
                  onClick={() => {
                    setActiveLine(row[primaryKey] as string);
                    setOpen(true);
                  }}
                >
                  <DeleteOutline color="error" />
                </IconButton>
              </StyledTableCell>
            )}
          </StyledTableRow>
        ))}
      {onDelete && (
        <ConfirmModal
          open={open}
          text={`Deseja realmente remover este(a) ${entityName}`}
          action={handleDelete}
          onClose={() => {
            setOpen(false);
          }}
        />
      )}

      {snackMessage && (
        <SnackMessage
          snackMessage={snackMessage}
          handleClose={() => setSnackMessage(null)}
        />
      )}
    </TableBody>
  );
};

export default TableContent;
