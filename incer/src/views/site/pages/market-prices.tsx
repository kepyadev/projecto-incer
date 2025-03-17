import {
  Card,
  CardContent,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { getAllNationalMarketPrices } from '../../../services/createnationalMarketPrices';
import { formatNumberDecimal } from '../../../utils';
import SiteAppBar from '../components/app-bar';
import SiteFooter from '../components/footer';
import SiteMenu from '../components/menu';

const MarketPrices = () => {
  const classes = useStyles();

  const [nationalMarket, setNationalMarket] = useState<any>();

  useEffect(() => {
    getAllNationalMarketPrices().then(response => {
      setNationalMarket(response.data?.payload);
      if (response.data) {
        setNationalMarket(response.data?.payload);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SiteAppBar />
      <SiteMenu />

      <Container className={classes.container}>
        <Typography variant="h4" className={classes.title}>
          Preços de Mercado Nacional
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Acompanhe os preços médios dos principais produtos nacionais.
        </Typography>
        <Grid container spacing={4}>
          {nationalMarket?.data.map((product: any) => (
            <Grid item xs={6} sm={6} md={4} key={v4()}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography className={classes.productName}>
                    {product.product}
                  </Typography>
                  <Typography className={classes.productPrice}>
                    {formatNumberDecimal(product.average_price)} Kz
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <SiteFooter />
    </>
  );
};

export default MarketPrices;

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.default,
    margin: '30px auto',
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '1200px', // Limite de largura para centralizar
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
  card: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      boxShadow: theme.shadows[6],
    },
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(3),
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
    fontSize: '1.5rem',
    fontWeight: 700,
    color: theme.palette.secondary.main,
  },
}));
