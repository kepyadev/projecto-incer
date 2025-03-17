import { Box, Container, Typography } from '@material-ui/core';
import React, { FC, useContext, useEffect, useState } from 'react';

import ErrorFail from '../../../../../../components/error-fail';
import InfoDetail from '../../../../../../components/info-detail';
import { InfoField } from '../../../../../../components/info-detail/infoDetail.types';
import Loading from '../../../../../../components/Loading';
import { Cooperative, County, Province } from '../../../../../../constants/entities';
import { User } from '../../../../../../constants/user';
import { AuthContext, AuthContextData } from '../../../../../../context/auth';
import useAsyncState from '../../../../../../hooks/use-async-state';
import { getMyCooperative } from '../../../../../../services/producer';
import { ICooperative } from '../../../../../../types/cooperative';

const CooperativaProducerView: FC = () => {
  const [cooperative, setCooperative] = useState<ICooperative>();
  const { error, setError, loading, setLoading } = useAsyncState();
  const { user } = useContext(AuthContext) as AuthContextData;

  useEffect(() => {
    setLoading(true);
    getMyCooperative()
      .then(res => {
        setCooperative(res.data?.payload);
      })
      .catch((erro: any) => {
        setError(erro);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  if (error) return <ErrorFail />;

  if (!cooperative)
    return (
      <Container>
        <Box
          style={{
            padding: '20px 10px',
            margin: '20% 10px',
            textAlign: 'center',
            backgroundColor: 'rgb(232, 244, 253)',
            color: 'rgb(13, 60, 97)',
          }}
        >
          <Typography>
            Caro produtor, ainda não está filiado a nenhuma cooperativa!{' '}
          </Typography>
          <Typography>
            Forneça ao presidente da sua cooperativa o seu código de produtor:
          </Typography>
          {user && (
            <Typography variant="h5">
              <b> {user[User.ShortCode]}</b>
            </Typography>
          )}
        </Box>
      </Container>
    );

  const fields: InfoField[] = [
    {
      label: 'Provincia',
      value:
        cooperative![Cooperative.County][County.Province]![Province.Description] ??
        '-',
    },
    {
      label: 'Municipio',
      value: cooperative![Cooperative.County][County.Description] ?? '-',
    },
    { label: 'Presidente', value: cooperative[Cooperative.Presindet] },
    { label: 'Contacto', value: cooperative[Cooperative.Contact].phone },
  ];

  return (
    <>
      <Typography variant="h6">
        Cooperativa - {cooperative[Cooperative.Description]}
      </Typography>

      <InfoDetail fields={fields} />
    </>
  );
};

export default CooperativaProducerView;
