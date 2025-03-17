/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/img/logo.png';

interface Ilogo {
  full?: boolean;
}

const Logo: FC<Ilogo> = ({ full = false }) => {
  const props = full ? { width: '100%' } : {};
  return (
    <Link to="/">
      <img src={logo} alt="logotipo" {...props} />
    </Link>
  );
};

export default Logo;
