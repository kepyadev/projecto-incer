import { Box, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { Producer } from '../../../../../../../constants/entities';
import { User } from '../../../../../../../constants/user';
import { getAllProducersByCooperative } from '../../../../../../../services/cooperative';
import { IProducer } from '../../../../../../../types/producer';
import { formatPhone } from '../../../../../../../utils';

const ProducerResume = () => {
  const [producers, setProducers] = useState<IProducer[]>();

  useEffect(() => {
    getAllProducersByCooperative({ page: 1, limit: 5 })
      .then(response => {
        setProducers(response.data?.payload.data);
      })
      .catch();
  }, []);
  return (
    <>
      <h4>Produtores</h4>
      {producers?.map(producer => {
        return (
          <Paper elevation={0} style={{ borderLeft: '1px solid black' }} key={v4()}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              style={{ margin: '10px 0px 10px 0px', padding: '10px 15px' }}
            >
              <div>
                <span>
                  {`${producer[Producer.User][User.FirstName]} ${
                    producer[Producer.User][User.LastName]
                  }`}
                </span>
                <br />
                <span>{formatPhone(producer[Producer.User][User.Phone])}</span>
              </div>
              {/*   <Link
                to={`${ROUTES.COOPERATIVE_PRODUCERS}/details/${
                  producer[Producer.Id]
                }`}
                style={{ textDecoration: 'none' }}
              >
                ver detalhes
              </Link> */}
            </Box>
          </Paper>
        );
      })}
    </>
  );
};

export default ProducerResume;
