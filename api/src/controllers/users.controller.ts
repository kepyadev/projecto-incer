import { Request, Response } from 'express';
import multer from 'multer';

import {
  getAllUsersService,
  serviceUpdateUser,
  uploadPhotoToMinio,
} from '../services/user.service';
import { errorResponse, makeResponse } from './utils';

const upload = multer({ storage: multer.memoryStorage() });

// eslint-disable-next-line import/prefer-default-export
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();

    return makeResponse(res, users);
  } catch (error: any) {
    return errorResponse(res, error.msg);
  }
};

export const updateUserById = async (_req: Request, res: Response) => {
  const { id } = _req.params;
  const data = _req.body;
  try {
    const users = await serviceUpdateUser(id, data);

    return makeResponse(res, users);
  } catch (error: any) {
    return errorResponse(res, error.msg);
  }
};

export const uploadPhoto = [
  upload.single('photo'), // 'file' é o campo no form-data do cliente
  async (req: Request, res: Response) => {
    const { file } = req; // Arquivo enviado no request

    try {
      const fileUrl = await uploadPhotoToMinio(file);

      return makeResponse(res, fileUrl, 'Arquivo enviado com sucesso', 201);
    } catch (error: any) {
      return errorResponse(res, error.msg);
    }
  },
];
