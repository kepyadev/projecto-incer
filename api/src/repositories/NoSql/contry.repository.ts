import countryModel from '../../entities/country.model';
import { CountryDTO } from '../../types/country';

export const getAllCountry = () => countryModel.find();

export const createCountry = (country: CountryDTO) => countryModel.create(country);
