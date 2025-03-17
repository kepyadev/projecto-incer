import { formatDate, formatNumberDecimal } from '.';

describe('UTILS', () => {
  it('Should return formated date', () => {
    const dateFormated = formatDate(new Date('2012/12/22'));
    expect(dateFormated).toBe('22/12/2012');
  });

  it('Should renturn empty string for undefined date', () => {
    const dateFormated = formatDate();
    expect(dateFormated).toBe('');
  });

  it('Shoud no format number down from 1000', () => {
    const response = formatNumberDecimal(900);

    expect(response).toBe('900.00');
  });

  it('Shoud format number up from 1000', () => {
    const response = formatNumberDecimal(1900);

    expect(response).toBe('1,900.00');
  });
});
