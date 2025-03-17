import { formatQuery } from '../service-helper';

describe('SERVICE HELPER', () => {
  it('Should return name=Zebedeu&age=12', () => {
    expect(formatQuery({ name: 'Zebedeu', age: 12 })).toBe('name=Zebedeu&age=12');
  });

  it('Should return name=Alexandre', () => {
    expect(formatQuery({ name: 'Alexandre' })).toBe('name=Alexandre');
  });

  it('Should return empty for {}', () => {
    expect(formatQuery({})).toBe('');
  });
});
