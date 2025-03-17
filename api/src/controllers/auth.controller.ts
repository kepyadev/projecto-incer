/* eslint-disable no-console */
/* eslint-disable camelcase */
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { env } from 'process';

import { HTTP, User, UserRole } from '../constants';
import { saveLog } from '../repositories/NoSql/logs.repository';
import {
  findUserByEmail,
  findUserByPhone,
  findUserByTokenReset,
  setToken,
  updatePassword,
} from '../repositories/NoSql/user.repository';
import { getProducerNifByUser } from '../services/producer.service';
import { serviceLogin, serviceSignup } from '../services/user.service';
import { CooperativeAcceptableFields, CooperativerRequiredFields } from '../types/cooperative';
import { ProducerAcceptableFields, ProducerRequiredFields } from '../types/producer';
import { IUser } from '../types/user';
import { isValidEmail, isValidPhoneNumber } from '../utils/regex';
import { signinFields, signupFields, signupRequiredFields } from './auth.types';
import {
  isPresentAllRequiredFieldOnBody,
  validateInputAcceptableData,
  validateInputRequeridData,
  validateToken,
} from './auth-helper';
import { errorResponse, makeResponse } from './utils';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const keys = Object.keys(req.body);

  if (isPresentAllRequiredFieldOnBody(keys, signinFields) !== true) {
    try {
      saveLog({
        emailphone: email || '',
        data: new Date().toISOString(),
        status: 'erro',
        operation: 'Login',
      });
    } catch (error) {
      console.log(error);
    }
    return res
      .status(HTTP.NOT_ACCEPTED)
      .send({ msg: 'Requisição mal formada', translation_key: 'E-1000' });
  }

  if (!isValidEmail(email) && !isValidPhoneNumber(email)) {
    try {
      saveLog({
        emailphone: email,
        data: new Date().toISOString(),
        status: 'erro',
        operation: 'Login',
      });
    } catch (error) {
      console.log('ELASTIC LANCOU', error);
    }

    return res
      .status(HTTP.NOT_ACCEPTED)
      .send({ msg: 'E-mail/Phone invalid', translation_key: 'E-1400' });
  }

  try {
    const response = await serviceLogin(email, password);
    if (response !== null) {
      saveLog({
        emailphone: email,
        data: new Date().toISOString(),
        status: 'sucesso',
        operation: 'Login',
      });
      return makeResponse(res, response, 'Bem-vindo');
    }

    saveLog({
      emailphone: email,
      data: new Date().toISOString(),
      status: 'Credênciais inválidas',
      operation: 'Login',
    });

    return errorResponse(res, 'Credencias inválidas', undefined, HTTP.UNAUTHORIZED);
  } catch (error: any) {
    saveLog({
      emailphone: email,
      data: new Date().toISOString(),
      status: error.message,
      operation: 'Login',
    });

    return errorResponse(res, error.message);
  }
};

export const logout = async (req: Request, res: Response) => {
  const user = req.user! as IUser;

  try {
    saveLog({
      emailphone: user[User.email] || user[User.phoneNumber] || '-',
      data: new Date().toISOString(),
      status: 'Sucesso',
      operation: 'Logout',
    });

    makeResponse(res, { msg: 'Sessão terminada' });
  } catch (error: any) {
    errorResponse(res, error.message);
  }
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { user, especific_information } = req.body;

    if (!user)
      return errorResponse(
        res,
        'Informações insuficientes: user, especific_information',
        '',
        HTTP.BAD_REQUEST
      );

    validateInputRequeridData(user, signupRequiredFields);
    validateInputAcceptableData(user, signupFields);

    if (user[User.email] && !isValidEmail(user[User.email]))
      return errorResponse(res, `E-mail inválido`, undefined, HTTP.NOT_ACCEPTED);

    const userByEmail = await findUserByEmail(user[User.email]);
    if (userByEmail) {
      return errorResponse(res, 'Este e-mail já está cadastrado!');
    }
    const userByPhone = await findUserByPhone(user[User.phoneNumber]);
    if (userByPhone) {
      return errorResponse(res, 'Este número de telefone já está cadastrado!');
    }

    const userByNif = await getProducerNifByUser(especific_information.nif);
    if (userByNif) {
      return errorResponse(res, 'Este número NIF já está cadastrado!');
    }

    if (user[User.role] === UserRole.Producer) {
      console.log('PRODUTOR');
      console.log('REQUERIDOS', ProducerRequiredFields);
      validateInputAcceptableData(especific_information, ProducerAcceptableFields);
      validateInputRequeridData(especific_information, ProducerRequiredFields);
    }

    if (user[User.role] === UserRole.Cooperative) {
      if (!especific_information.president)
        return errorResponse(res, `Presidente não informado`, undefined, HTTP.NOT_ACCEPTED);

      validateInputAcceptableData(especific_information, CooperativeAcceptableFields);
      validateInputRequeridData(especific_information, CooperativerRequiredFields);
    }

    const loginResult = await serviceSignup(user, especific_information);
    return makeResponse(res, loginResult, 'Utilizador cadastrado', HTTP.CREATED);
  } catch (error: any) {
    console.error(error);
    if (error.code === 11000) {
      return errorResponse(
        res,
        `Lamentamos, já foi registrado o e-mail`, //  ${error.keyValue.email}
        undefined,
        HTTP.UNAUTHORIZED,
        error.code
      );
    }
    console.log('EE', error);
    return errorResponse(res, error.message);
  }
};

export const tokenVerify = async (req: Request, res: Response) => {
  const token = (req.query.token as string) || '';
  const tokenDestruct = token.split(' ');

  if (tokenDestruct.length === 0 || tokenDestruct[0] !== process.env.TOKEN_TYPE) {
    res
      .status(422)
      .json({ msg: 'Lamentamos,o token que informou é inválido', error: 'invalid token' });
  }

  try {
    const decoded = await validateToken(tokenDestruct[1], process.env.JWT_SECRET || 'error');
    return makeResponse(res, { user: decoded });
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

async function sendEmail(email: string, token: string) {
  const mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.EMAIL_SENDER, // Your email id
      pass: env.EMAIL_SENDER_PASSWORD, // Your password
    },
  });

  const mailOptions = {
    from: env.EMAIL_SENDER,
    to: email,
    subject: 'Recuperação da palavra passe - INCER',
    html: `<p>Solicitou a recuperação da sua palavra passe, use este <a href="${env.CLIENT_URL}reset-password?token=${token}">link</a> para redefinir a sua palavra passe</p>`,
  };

  mail.sendMail(mailOptions, (error, _info) => {
    if (error) {
      throw new Error('Lamentamos, ocorreu algum erro!');
    }
  });

  return true;
}

export const resetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (user) {
    const token = jwt.sign({ user }, process.env.JWT_SECRET || 'error', {
      expiresIn: '120s',
    });

    const sent = await sendEmail(email, token);

    if (sent) {
      if (await setToken(email, token))
        return makeResponse(
          res,
          'Um link para recuperaçao da sua senha foi enviado para o seu e-mail!'
        );
    } else {
      return errorResponse(res, 'Lamentamos, ocorreu algum erro!');
    }
  }
  return errorResponse(res, 'Este e-mail não está registrado!');
};

export const resetPasswordUpdate = async (req: Request, res: Response) => {
  const { password } = req.body;
  const { token } = req.params;

  const user = await findUserByTokenReset(token);
  if (user.length > 0) {
    console.log('UUS', user);
    await updatePassword(user[0][User.id], password);
    return makeResponse(res, {}, 'Palavra passe actualizada!');
  }

  return errorResponse(res, 'Lamentamos, ocorreu algum erro!');
};
