import {
  Box,
  Button,
  Container,
  FormControl,
  MenuItem,
  Select,
  TablePagination,
  Typography,
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import { CloudUpload, SearchOutlined } from '@material-ui/icons';
import AddBoxIcon from '@material-ui/icons/AddBox';
import PrintIcon from '@material-ui/icons/Print';
import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 } from 'uuid';

import {
  Alignment,
  pdfOrientation,
} from '../../adapter/contracts/pdf_export.adapter';
import logo from '../../assets/img/logo.png';
import { User } from '../../constants/user';
import { AuthContext, AuthContextData } from '../../context/auth';
import useAPI from '../../hooks/use-api';
import useAsyncState from '../../hooks/use-async-state';
import useIsMounted from '../../hooks/use-is-mounted';
import { ListDataResponse } from '../../services/services.types';
import { Entity } from '../../types';
import { MsgData } from '../../types/services';
import { processCSV } from '../../utils/csv';
import ErrorFail from '../error-fail';
import Loading from '../Loading';
import NotData from '../not-data';
import SnackMessage from '../snack-message';
import { useStyles } from './table.styles';
import { GenericTableProps, RowsPerPageValues } from './table.types';
import TableContent from './table-content';
import TableHead from './table-head';

const GenericTable: FC<GenericTableProps> = ({
  tableId,
  cells,
  entityName,
  fetcher,
  dataModifier,
  onCreate,
  onDelete,
  primaryKey,
  setOpenEdit,
  onSelectOne,
  title,
  height,
  importData,
  pdf,
  FilterForm,
  filterFieldLabels,
  pagination = true,
}) => {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState<Record<string, any>>({});
  const classes = useStyles();
  const isMounted = useIsMounted();
  const { snackMessage, setSnackMessage, loading, setLoading } = useAsyncState();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(RowsPerPageValues[0]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchTotalCount, setSearchTotalCount] = useState<number | null>();
  const [searchData, setSearchData] = useState<ReadonlyArray<Entity> | null>(null);
  const [count, setCount] = useState(0);
  const formId = v4();

  const { user } = useContext(AuthContext) as AuthContextData;
  // const [activeLinePrimaryKey, setActiveLinePrimaryKey] = useState<string | null>(
  //   null
  // );
  const { data, error, mutate, loadingSwr } = useAPI<
    MsgData<ListDataResponse<ReadonlyArray<Entity>>>
  >({
    id: `${tableId}`,
    fetcher,
    fetcherParams: {},
  });

  const handleChangePage = useCallback((_event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  useEffect(() => {
    (async () => {
      if (isMounted.current) {
        try {
          setSnackMessage(null);
          setSearchLoading(true);

          if (Object.keys(searchQuery).length > 0) {
            Object.keys(searchQuery).map(query => {
              const h = (
                dataModifier
                  ? dataModifier(data?.payload.data || [])
                  : data?.payload.data || []
              ).filter(value => {
                return (
                  value[query] === searchQuery[query] ||
                  (value[query] as String)
                    .toLowerCase()
                    .includes((searchQuery[query] as String).toLowerCase())
                );
              });

              if (isMounted.current) {
                setSearchData(h || []);
                setSearchTotalCount(h.length);
                setCount(h.length);
              }
              return true;
            });
          } else {
            setSearchData(null);
          }
        } catch (errorCatch) {
          if (isMounted.current)
            setSnackMessage({
              message: 'Lamentamos, ocorreu um erro!',
              isError: true,
            });
        }
      } else if (isMounted.current) {
        console.log('IN 3');
        setSearchData(data?.payload?.data || []);
        setSearchTotalCount(data?.payload?.count || 0);
        setCount(data?.payload?.count || 0);
      }
      if (isMounted.current) {
        setCount(data?.payload.data.length || 0);
        setSearchLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, fetcher, entityName, dataModifier, isMounted, page, loadingSwr]);

  useEffect(() => {
    setCount(data?.payload.count || 0);
  }, [isMounted]);

  const dataShow = searchData || (dataModifier?.(data?.payload.data || []) ?? []);

  const modifiedData = dataShow;

  // useEffect(() => {
  //   setCount(dataShow.length);
  //   console.log('COUNT1', count);
  // }, [count]);

  if (error)
    return (
      <Container style={{ textAlign: 'center' }}>
        <ErrorFail text={error.message} />
        {error?.msg}
        <Typography variant="body2">Lamentamos, ocorreu um erro</Typography>
      </Container>
    );

  // setCount(data?.payload.count ?? 0);

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(event.target.value as number);
  };

  const handleChangeImport = (e: any) => {
    if (e && e.target && e.target.files) {
      const input = e.target.files[0];
      const reader = new FileReader();

      // eslint-disable-next-line func-names
      reader.onload = function (params: any) {
        const dataSend = processCSV(params.target.result);

        if (importData) {
          setLoading(true);
          importData(dataSend)
            .then(() => {
              setSnackMessage({
                isError: false,
                message: `${entityName} importados com sucesso!`,
              });
            })
            .catch((erro: any) => {
              setSnackMessage({
                isError: true,
                message: erro.msg || erro.message,
              });
            })
            .finally(() => {
              setLoading(false);
            });
        }
      };

      reader.readAsText(input);
    }
  };

  return (
    <div>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent={title ? 'space-between' : 'flex-end'}
        alignItems="center"
        flexWrap="wrap"
        style={{
          paddingBottom: '16px',
        }}
      >
        {title && <Typography variant="h5">{title}</Typography>}
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
          flexGrow={1}
          className={classes.pageOption}
        >
          {importData && (
            <Box>
              <label htmlFor="contained-button-file">
                <input
                  type="file"
                  accept=".csv"
                  id="contained-button-file"
                  hidden
                  onChange={handleChangeImport}
                />
                <Button
                  variant="contained"
                  component="span"
                  disableElevation
                  color="secondary"
                >
                  <CloudUpload /> Importar
                </Button>
              </label>
            </Box>
          )}

          {pdf && (
            <Box ml={2}>
              <Button
                color="secondary"
                variant="contained"
                disableElevation
                style={
                  {
                    // height: '32px',
                  }
                }
                size="small"
                onClick={() => {
                  const filterText = Object.keys(searchQuery).map(key => {
                    return `${
                      filterFieldLabels && filterFieldLabels[key]
                        ? filterFieldLabels[key]
                        : key
                    }: ${searchQuery[key]} `;
                  });

                  pdf.execute(
                    `Relatório de ${entityName}`,
                    logo,
                    [
                      // pdf.imageGenerator(logo, 100),
                      pdf.textGenerator(
                        `Relatório de ${entityName}`,
                        undefined,
                        true
                      ),
                      pdf.textGenerator(
                        `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
                        8
                      ),
                      pdf.textGenerator(
                        '',
                        undefined,
                        undefined,
                        undefined,
                        [0, 20, 0, 20]
                      ),

                      pdf.textGenerator('FILTRO', 8, true),
                      pdf.textGenerator(filterText.join(' | '), 8),
                      pdf.textGenerator('-', 6, false, Alignment.Center),
                      pdf.textGenerator('-', 6, false, Alignment.Center),
                      pdf.table(cells, modifiedData as any),
                      pdf.textGenerator(
                        'Relarorio gerado automaticamente em:',
                        6,
                        false,
                        Alignment.Right,
                        [0, 20, 0, 0]
                      ),
                      pdf.textGenerator(
                        `${process.env.REACT_APP_BASE_URL}${history.location.pathname}`,
                        6,
                        false,
                        Alignment.Right,
                        [0, 0, 0, 0]
                      ),
                      pdf.textGenerator(
                        `${user![User.Id]}`,
                        6,
                        false,
                        Alignment.Right,
                        [0, 0, 0, 0]
                      ),
                    ],
                    cells.length > 7
                      ? pdfOrientation.landscape
                      : pdfOrientation.Portrait
                  );
                }}
              >
                Exportar PDF
                <PrintIcon style={{ marginLeft: '15px' }} />
              </Button>
            </Box>
          )}

          {onCreate && (
            <Box ml={2}>
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
                onClick={() => {
                  onCreate(mutate);
                }}
              >
                Adicionar Novo
                <AddBoxIcon style={{ marginLeft: '15px' }} />
              </Button>
            </Box>
          )}
        </Box>
      </Box>
      {FilterForm && (
        <>
          <FilterForm
            formId={formId}
            onFilter={setSearchQuery}
            values={searchQuery}
          />
          <Button
            type="submit"
            form={formId}
            color="primary"
            variant="contained"
            style={{ margin: '10px 0' }}
          >
            {searchLoading ? (
              <Loading withText={false} color="secondary" />
            ) : (
              <>
                <SearchOutlined style={{ marginRight: '15px' }} />
                Pesquisar
              </>
            )}
          </Button>
          <Button
            type="reset"
            form={formId}
            onClick={() => {
              setSearchQuery({});
            }}
          >
            Limpar
          </Button>
        </>
      )}
      {count >= 0 ? (
        <div>
          {loading || loadingSwr || searchLoading ? (
            <Loading />
          ) : (
            <>
              {pagination && (
                <div className={classes.overTable}>
                  <Box
                    style={{ flexGrow: 5 }}
                    display="flex"
                    alignItems="center"
                    justifyItems="space-around"
                  >
                    <Typography variant="body1">
                      Mostrando{' '}
                      {
                        modifiedData.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        ).length
                      }{' '}
                      de {count}
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
                        defaultValue={15}
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
              )}
              <TableContainer style={{ height: height || '45vh' }}>
                <Table
                  className={classes.table}
                  aria-label={`${entityName}-table`}
                  id="table"
                >
                  <TableHead
                    cells={cells}
                    hasOperation={
                      onDelete !== undefined || setOpenEdit !== undefined
                    }
                  />

                  <TableContent
                    rows={modifiedData}
                    cells={cells}
                    primaryKey={primaryKey}
                    onDelete={onDelete}
                    entityName={entityName}
                    setOpenEdit={setOpenEdit}
                    onSelectOne={onSelectOne}
                    page={page}
                    rowsPerPage={rowsPerPage}
                  />
                </Table>
              </TableContainer>
            </>
          )}

          {pagination && (
            <TablePagination
              rowsPerPage={rowsPerPage}
              page={page}
              count={searchTotalCount || count || 0}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              component="div"
              rowsPerPageOptions={[]}
            />
          )}
        </div>
      ) : (
        <NotData />
      )}

      {snackMessage && (
        <SnackMessage
          snackMessage={snackMessage}
          handleClose={() => setSnackMessage(null)}
        />
      )}
    </div>
  );
};

export default GenericTable;
