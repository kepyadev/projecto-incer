import {
  Box,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { getAllNationalProduction } from '../../../services/NationalProduction';
import { formatNumberDecimal } from '../../../utils';
import SiteAppBar from '../components/app-bar';
import SiteFooter from '../components/footer';
import SiteMenu from '../components/menu';

const NationalProduction: FC = () => {
  const classes = useStyles();

  const [nationalProduction, setNationalProduction] = useState<any>();

  useEffect(() => {
    getAllNationalProduction().then(response => {
      setNationalProduction(response.data?.payload);
      if (response.data) {
        setNationalProduction(response.data?.payload);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SiteAppBar />
      <SiteMenu />
      <Box className={classes.container}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          className={classes.title}
        >
          Produção Nacional
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          gutterBottom
          className={classes.subtitle}
        >
          Dados atualizados sobre a produção nacional e os preços médios dos
          produtos.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {nationalProduction?.data.map((product: any) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={v4()}>
              <Card className={classes.card}>
                <div className={classes.cardHeader}>
                  <Typography variant="h6">{product.product}</Typography>
                </div>
                <CardContent className={classes.cardContent}>
                  <Typography className={classes.productPrice}>
                    Volume: {formatNumberDecimal(product.quantity_produced)}{' '}
                    toneladas
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <SiteFooter />
    </>
  );
};

export default NationalProduction;

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: '50px',
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      boxShadow: theme.shadows[6],
    },
  },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: 700,
    color: theme.palette.primary.main,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: theme.spacing(4),
    color: theme.palette.text.secondary,
    textAlign: 'center',
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2),
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    textAlign: 'center',
  },
  cardContent: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  productTitle: {
    fontWeight: 700,
    fontSize: '1.2rem',
    marginBottom: theme.spacing(1),
  },
  productName: {
    fontSize: '1.2rem',
    fontWeight: 700,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
  },
  productVolume: {
    fontSize: '1rem',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  },
  productPrice: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: theme.palette.secondary.main,
  },
}));
