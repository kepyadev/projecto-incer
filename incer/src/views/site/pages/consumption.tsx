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

import { getAllConsumption } from '../../../services/consumption';
import { ImportedProductsDTO } from '../../../types/ImportedProducts';
import { formatNumberDecimal } from '../../../utils';
import SiteAppBar from '../components/app-bar';
import SiteFooter from '../components/footer';
import SiteMenu from '../components/menu';

const Consumption = () => {
  const classes = useStyles();

  const [importedProduct, setImportedProducts] = useState<any>();

  useEffect(() => {
    getAllConsumption().then(response => {
      setImportedProducts(response.data?.payload);
      if (response.data) {
        setImportedProducts(response.data?.payload);
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
          Produtos Importados
        </Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>
          Confira os principais produtos importados e seus respectivos preços de
          mercado.
        </Typography>
        <Grid container spacing={4}>
          {importedProduct?.data.map((product: ImportedProductsDTO) => (
            <Grid item xs={6} sm={6} md={4} key={v4()}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography className={classes.productName}>
                    {product.product}
                  </Typography>
                  <Typography className={classes.productVolume}>
                    Volume: {formatNumberDecimal(product.quantity_imported)} unidades
                  </Typography>
                  <Typography className={classes.productPrice}>
                    {product.market_price} Kz
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

export default Consumption;
const useStyles = makeStyles(theme => ({
  container: {
    margin: '30px auto',
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
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
