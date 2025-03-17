import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { render, screen } from '@testing-library/react';
import React, { FC, ReactNode } from 'react';

import SiteMenu from '.';

enum Size {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

const createWrapper = (children: ReactNode, size: Size) => {
  const theme = createTheme({
    props: { MuiWithWidth: { initialWidth: size } },
  });

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

describe('SITE MENU', () => {
  const makeSut = (size: Size) => {
    const SizeWrapper: FC = ({ children }) => {
      return createWrapper(children, size);
    };
    render(<SiteMenu />, { wrapper: SizeWrapper });
  };
  it(`Should render as expected for ${Size.XS} display size`, () => {
    makeSut(Size.XS);
    expect(screen.queryByText(/produtores/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/consumidores/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/revendedores/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/fabricas & quintas/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/ferramentas/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/preços do mercado/i)).not.toBeInTheDocument();
  });

  it(`Should render as expected for ${Size.SM} display size`, () => {
    makeSut(Size.SM);
    screen.getByText(/produtores/i).closest('a');
    screen.getByText(/consumidores/i).closest('a');
    screen.getByText(/revendedores/i).closest('a');
    screen.getByText(/fabricas & quintas/i).closest('a');
    screen.getByText(/ferramentas/i).closest('a');
    screen.getByText(/preços do mercado/i).closest('a');
  });

  it(`Should render as expected for ${Size.MD} display size`, () => {
    makeSut(Size.MD);
    screen.getByText(/produtores/i).closest('a');
    screen.getByText(/consumidores/i).closest('a');
    screen.getByText(/revendedores/i).closest('a');
    screen.getByText(/fabricas & quintas/i).closest('a');
    screen.getByText(/ferramentas/i).closest('a');
    screen.getByText(/preços do mercado/i).closest('a');
  });

  it(`Should render as expected for ${Size.LG} display size`, () => {
    makeSut(Size.LG);
    screen.getByText(/produtores/i).closest('a');
    screen.getByText(/consumidores/i).closest('a');
    screen.getByText(/revendedores/i).closest('a');
    screen.getByText(/fabricas & quintas/i).closest('a');
    screen.getByText(/ferramentas/i).closest('a');
    screen.getByText(/preços do mercado/i).closest('a');
  });
});
