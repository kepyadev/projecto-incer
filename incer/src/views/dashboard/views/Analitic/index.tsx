import { Box, Grid, Paper } from '@material-ui/core';
import React, { FC, useContext } from 'react';

import SvgAnimal from '../../../../components/svg/animal';
import SvgCulture from '../../../../components/svg/culture';
import SvgEquipament from '../../../../components/svg/equipment';
import SvgFazenda from '../../../../components/svg/fazenda';
import SvgInfrastructure from '../../../../components/svg/infrastructure';
import SvgMachine from '../../../../components/svg/machine';
import SvgProducer from '../../../../components/svg/producer';
import { User } from '../../../../constants/user';
import { AuthContext, AuthContextData } from '../../../../context/auth';

const Analitic: FC = () => {
  const { user } = useContext(AuthContext) as AuthContextData;

  // const classes = makeStyles((_theme: Theme) =>
  //   createStyles({
  //     paperr: {
  //       '& :hover': {
  //         boxShadow: '4px 5px 10px 1px rgba(0, 0, 0, 0.5)',
  //       },
  //     },
  //   })
  // )();

  interface IDashboardItemProps {
    text: string;
    url: string;
  }

  const DashboardItem: FC<IDashboardItemProps> = ({ children, text, url }) => {
    return (
      <Grid item xs={12} md={4} sm={4}>
        <a
          href={`${superset}${url}`}
          rel="noreferrer"
          target="_blank"
          style={{ textDecoration: 'none' }}
        >
          <Paper
            style={{
              padding: '8px 16px',
              textAlign: 'center',
            }}
          >
            <Box
              style={{
                height: '150px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                style={{
                  height: '80px',
                  marginBottom: '8px',
                }}
              >
                {children}
              </Box>
              {text}
            </Box>
          </Paper>
        </a>
      </Grid>
    );
  };

  const superset = process.env.REACT_APP_SUPERSET;
  return (
    <Grid
      container
      spacing={2}
      style={{
        marginBottom: '50px',
        display: 'flex',
        flexDirection: 'row',
        justifyItems: 'center',
        justifyContent: 'center',
      }}
    >
      {user && user[User.Permitions]?.includes('/cultures') && (
        <DashboardItem text="Culturas" url="/r/9">
          <SvgCulture color="rgb(247, 175, 27)" />
        </DashboardItem>
      )}

      {user && user[User.Permitions]?.includes('/machine') && (
        <DashboardItem text="Máquinas" url="/r/10">
          <SvgMachine color="rgb(247, 175, 27)" />
        </DashboardItem>
      )}

      {user && user[User.Permitions]?.includes('/fazendas') && (
        <DashboardItem text="Fazendas" url="/r/12">
          <SvgFazenda color="rgb(247, 175, 27)" />
        </DashboardItem>
      )}

      {user && user[User.Permitions]?.includes('/equipamentos') && (
        <DashboardItem text="Equipamentos" url="/r/14">
          <SvgEquipament color="rgb(247, 175, 27)" />
        </DashboardItem>
      )}

      {user && user[User.Permitions]?.includes('/animal') && (
        <DashboardItem text="Animal" url="/r/17">
          <SvgAnimal color="rgb(247, 175, 27)" />
        </DashboardItem>
      )}

      {user && user[User.Permitions]?.includes('/infraestrutura') && (
        <DashboardItem text="Infraestrutura" url="/r/13">
          <SvgInfrastructure color="rgb(247, 175, 27)" />
        </DashboardItem>
      )}

      {user && user[User.Permitions]?.includes('/human-resource') && (
        <DashboardItem text="Recursos humanos" url="/r/16">
          <SvgProducer color="rgb(247, 175, 27)" />
        </DashboardItem>
      )}
    </Grid>
  );
};
export default Analitic;
