import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../constants';
import { UserRole } from '../types/user';

export const isPasswordMatching = async (
  enterPassword: string,
  storedPassword: string
): Promise<boolean> => {
  const isEqual = await bcrypt.compare(enterPassword, storedPassword);
  return isEqual;
};

export const generateAccessToken = (user: {
  [User.firstName]: string;
  [User.email]?: string;
  [User.id]: string;
  [User.role]: UserRole;
}): string =>
  `${process.env.TOKEN_TYPE} ${jwt.sign({ user }, process.env.JWT_SECRET || 'error', {
    expiresIn: process.env.TOKEN_EXPIRES_TIME || '1800s',
  })}`;

export const validateToken = (token: string, secret: string) => jwt.verify(token, secret);

export const isPresentAllRequiredFieldOnBody = (
  bodyFields: Array<string>,
  requiredFields: Array<string>
) => {
  for (let i = 0; i < requiredFields.length; i += 1) {
    if (!bodyFields.includes(requiredFields[i])) return requiredFields[i];
  }

  return true;
};

export const isAllGivenFieldAcceptedForEntity = (
  bodyFields: Array<string>,
  acceptedFields: Array<string>
): boolean | string => {
  for (let i = 0; i < bodyFields.length; i += 1) {
    if (!acceptedFields.includes(bodyFields[i])) {
      return bodyFields[i];
    }
  }

  return true;
};

/**
 * Este metódo lança uma excepção caso o objecto não tenha todos campos
 * obrigatórios ou tenha campos não aceitaveis
 *
 * @param data objecto por ser validado
 * @param requiredFields campos obrigatórios
 * @param acceptableFields campos aceitaveis
 */
export const validateInputRequeridData = (data: Record<string, any>, requiredFields: string[]) => {
  const keys = Object.keys(data);
  const isAllRequired = isPresentAllRequiredFieldOnBody(keys, requiredFields);

  if (isAllRequired !== true)
    throw new Error(`Estão em falta campos obrigatórios: ${isAllRequired}`);
};
/**
 * Este metódo lança uma excepção caso o objecto não tenha todos campos
 * obrigatórios ou tenha campos não aceitaveis
 *
 * @param data objecto por ser validado
 * @param requiredFields campos obrigatórios
 * @param acceptableFields campos aceitaveis
 */
export const validateInputAcceptableData = (
  data: Record<string, any>,
  acceptableFields: string[]
) => {
  const keys = Object.keys(data);

  const isAllgiven = isAllGivenFieldAcceptedForEntity(keys, acceptableFields);
  if (isAllgiven !== true) throw new Error(`Informou campos não aceites: ${isAllgiven}`);
};
