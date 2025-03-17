import React, { FC } from 'react';

import SiteAppBar from './components/app-bar';
import SiteBanner from './components/banner';
import SiteFooter from './components/footer';
import SiteMenu from './components/menu';

const Site: FC = () => {
  return (
    <>
      <SiteAppBar />
      <SiteMenu />
      <SiteBanner />
      <SiteFooter />
    </>
  );
};

export default Site;
