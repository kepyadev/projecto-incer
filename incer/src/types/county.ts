export interface ICounty {
  _id: string;
  description: string;
  province: string;
}

export interface ICountyWithProvince {
  _id: string;
  description: string;
  province: {
    _id: string;
    description: string;
  };
}
