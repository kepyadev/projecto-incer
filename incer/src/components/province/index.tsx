import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { v4 } from 'uuid';

import { County, Province } from '../../constants/entities';
import { ICounty, IProvince } from '../../types';

export type GridSize = 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface IProvinceProps {
  provinces: IProvince[] | undefined;
  md?: GridSize;
  sm?: GridSize;
  lg?: GridSize;
  xs?: GridSize;
  withCounty?: boolean;
  handleChangeOfProvince: (value: any) => any;
  handleChangeOfCounty?: (value: any) => any;
  returnOfProvince?: keyof IProvince;
  returnOfCounty?: keyof ICounty;
}

const ProvinceComponent: FC<IProvinceProps> = ({
  provinces,
  lg = 3,
  md = 3,
  sm = 6,
  xs = 12,
  withCounty = true,
  handleChangeOfCounty,
  handleChangeOfProvince,
  returnOfProvince = Province.Description,
  returnOfCounty = County.Description,
}) => {
  const [countys, setCountys] = useState<ICounty[]>();

  const [province, setProvince] = useState<string>();
  const [county, setCounty] = useState<string>();

  const findProvince = (
    allProvinces: IProvince[] | undefined,
    provinceId: string
  ): IProvince | undefined => {
    return allProvinces?.filter(provinceItem => {
      return provinceItem[Province.Id] === provinceId;
    })[0];
  };

  const findCounty = (
    allCountys: ICounty[] | undefined,
    countyId: string
  ): ICounty | undefined => {
    return allCountys?.filter(countyItem => {
      return countyItem[County.Id] === countyId;
    })[0];
  };

  const handleChangeProvince = (value: any) => {
    setProvince(value.target.value);
    const pro = findProvince(provinces, value.target.value);
    handleChangeOfProvince(pro ? pro[returnOfProvince] : '');
    setCountys(pro?.countys);
  };
  const handleChangeCounty = (value: any) => {
    setCounty(value.target.value);

    const coun = findCounty(countys, value.target.value);
    if (handleChangeOfCounty) handleChangeOfCounty(coun ? coun[returnOfCounty] : '');
  };

  return (
    <>
      <Grid item lg={lg} md={md} sm={sm} xs={xs}>
        <FormControl variant="outlined" style={{ width: '100%' }}>
          <InputLabel id="province-label">Província</InputLabel>
          <Select
            name="province"
            labelId="province-label"
            id="province"
            onChange={handleChangeProvince}
            fullWidth
            label="Província"
            defaultValue={province}
          >
            <MenuItem value={undefined} key={v4()}>
              Selecione uma provínvia
            </MenuItem>
            {provinces &&
              provinces.map((provinceItem: IProvince) => {
                return (
                  <MenuItem value={provinceItem[Province.Id]} key={v4()}>
                    {provinceItem[Province.Description]}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </Grid>
      {withCounty && (
        <Grid item lg={lg} md={md} sm={sm} xs={xs}>
          <FormControl variant="outlined" style={{ width: '100%' }}>
            <InputLabel id="county-label">Município</InputLabel>
            <Select
              labelId="county-label"
              id="county"
              defaultValue={county}
              onChange={handleChangeCounty}
              fullWidth
              label="Município"
              name="municipio"
              disabled={!countys}
            >
              <MenuItem value={undefined} key={v4()}>
                Selecione um município
              </MenuItem>
              {countys &&
                countys.map(countyItem => {
                  return (
                    <MenuItem value={countyItem[County.Id]} key={v4()}>
                      {countyItem[County.Description]}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Grid>
      )}
    </>
  );
};

export default ProvinceComponent;
