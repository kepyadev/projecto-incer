// eslint-disable-next-line import/prefer-default-export
export const isValidEmail = (email: string): boolean => {
  const expression = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  return expression.test(email);
};

export const isValidPhoneNumber = (phone: string) => {
  const expression = new RegExp(/^9[0-9]{8}$/);

  return expression.test(phone);
};

export const isValidBiNumber = (biNumber: string) => {
  const expression = new RegExp(/^[0-9]{9}[a-zA-Z]{2}[0-9]{3}$/);

  return expression.test(biNumber);
};
