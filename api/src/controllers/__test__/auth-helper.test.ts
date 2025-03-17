import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User, UserRole } from '../../constants';
import {
  generateAccessToken,
  isAllGivenFieldAcceptedForEntity,
  isPasswordMatching,
  isPresentAllRequiredFieldOnBody,
  validateToken,
} from '../auth-helper';

describe('AUTH HELPER', () => {
  it('Should return TRUE for equals password/storedPassword and hashed storedPassword', async () => {
    const password = 'pass';
    const passwordStored = 'pass';
    const hashedPassword = await bcrypt.hash(passwordStored, 10);
    const isMatching = await isPasswordMatching(password, hashedPassword);
    expect(isMatching).toBe(true);
  });

  it('Should return FALSE for differents password/storedPassword and hashed storedPassword', async () => {
    const password = 'pass';
    const passwordStored = '1234';
    const hashedPassword = await bcrypt.hash(passwordStored, 10);
    const isMatching = await isPasswordMatching(password, hashedPassword);
    expect(isMatching).toBe(false);
  });

  it('Should return FALSE for equals password/storedPassword and no hashed storedPassword', async () => {
    const password = 'pass';
    const passwordStored = 'pass';
    const isMatching = await isPasswordMatching(password, passwordStored);
    expect(isMatching).toBe(false);
  });

  it('Should return FALSE for differentd password/storedPassword and no hashed storedPassword', async () => {
    const password = 'pass';
    const passwordStored = '1234';
    const isMatching = await isPasswordMatching(password, passwordStored);
    expect(isMatching).toBe(false);
  });
});
jwt.sign = jest.fn();
describe('GENERATE ACCESS TOKEN', () => {
  it('Should generate a token', () => {
    (jwt.sign as jest.Mock).mockReturnValue('jwttokenencriptado');

    const token = generateAccessToken({
      [User.email]: 'it@laminin.co.ao',
      [User.firstName]: '1234',
      [User.id]: '40879408',
      [User.role]: UserRole.Producer,
    });
    expect(token).toBe('tokenype jwttokenencriptado');
  });
});

jwt.verify = jest.fn();

describe('VALIDATE TOKEN', () => {
  it('Should call JWT VERIFY with rigth params', () => {
    (jwt.verify as jest.Mock).mockReturnValue(true);
    const secret = process.env.JWT_SECRET;
    const token = 'token';
    const isValid = validateToken(token, secret!);
    expect(isValid).toBe(true);
    expect(jwt.verify).toBeCalledWith(token, secret);
  });
});

describe('IS PRESENT ALL REQUIRED FIELDS IN BODY', () => {
  it('return true if all required fields are presents on bodyrequest', () => {
    const bodyFields = ['email', 'password', 'first_name'];
    const requiredFields = ['email', 'password'];
    expect(isPresentAllRequiredFieldOnBody(bodyFields, requiredFields)).toBe(true);
  });

  it('Return first missing field if bodyrequest there is not a required field', () => {
    const bodyFields = ['email'];
    const requiredFields = ['email', 'password'];
    expect(isPresentAllRequiredFieldOnBody(bodyFields, requiredFields)).toBe('password');
  });
});

describe('ACCEPTED FIELDS', () => {
  it('Return True if all given fields are accepted for entity', () => {
    const body = ['name', 'email'];
    const accepted = ['name', 'email'];
    const result = isAllGivenFieldAcceptedForEntity(body, accepted);
    expect(result).toBe(true);
  });

  it('Return first not acceptable field ', () => {
    const body = ['name', 'email'];
    const accepted = ['name'];
    const result = isAllGivenFieldAcceptedForEntity(body, accepted);
    expect(result).toBe('email');
  });
});
