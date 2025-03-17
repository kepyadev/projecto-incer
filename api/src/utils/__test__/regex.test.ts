import { isValidBiNumber, isValidEmail } from '../regex';

describe('REGEX E-MAIL', () => {
  it('RETURN TRUE for => email@laminin.co.ao', () => {
    const result = isValidEmail('email@laminin.co.ao');
    expect(result).toBe(true);
  });
  it('RETURN TRUE for => email@laminin.com', () => {
    const result = isValidEmail('email@laminin.com');
    expect(result).toBe(true);
  });

  it('RETURN FALSE for => emaillaminin.co.ao', () => {
    const result = isValidEmail('emaillaminin.co.ao');
    expect(result).toBe(false);
  });

  it('RETURN FALSE for => email@laminin', () => {
    const result = isValidEmail('email@laminin');
    expect(result).toBe(false);
  });
});

describe('REGEX BI NUMBER', () => {
  it('RETURN FALSE for => 00313938L333', () => {
    const result = isValidBiNumber('00313938L333');
    expect(result).toBe(false);
  });
  it('RETURN FALSE for => 0039393823823', () => {
    const result = isValidBiNumber('0039393823823');
    expect(result).toBe(false);
  });

  it('RETURN TRUE for => 005437897LA041', () => {
    const result = isValidBiNumber('005437897LA041');
    expect(result).toBe(true);
  });
});
