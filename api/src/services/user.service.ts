import { Cooperative, owner, Producer, User, UserRole } from '../constants';
import { generateAccessToken, isPasswordMatching } from '../controllers/auth-helper';
import {
  createCooperative,
  findCooperativeByUser,
  updateCooperative,
} from '../repositories/NoSql/cooperative.repository';
import { findProducerByUser } from '../repositories/NoSql/producer.repository';
import {
  createUser,
  deleteUser,
  findAllUsers,
  findUserByEmail,
  updateUser,
} from '../repositories/NoSql/user.repository';
import { CooperativeDTO, ICooperative } from '../types/cooperative';
import { ProducerDTO } from '../types/producer';
import { IUser, userDTO } from '../types/user';
import minioClient from '../utils/minio';
import { putPeroducerByid, serviceCreateProducer } from './producer.service';

export interface File {
  originalname: string; // Nome original do arquivo
  buffer: Buffer; // Conteúdo do arquivo em buffer
  mimetype: string; // Tipo MIME do arquivo
  size: number; // Tamanho do arquivo em bytes
  encoding: string; // Codificação do arquivo
  fieldname: string; // Nome do campo no form-data
  destination?: string; // (Se configurado) Diretório de destino
  filename?: string; // (Se configurado) Nome do arquivo no servidor
  path?: string; // (Se configurado) Caminho completo no servidor
}
const userToSend = (user: IUser, cooperative?: ICooperative) => ({
  [User.id]: user[User.id],
  [User.name]:
    user[User.role] === UserRole.Producer
      ? `${user[User.firstName]} ${user[User.lastName]}`
      : `${user[User.firstName]}`,
  [User.firstName]: user[User.firstName],
  [User.lastName]: user[User.lastName],
  [User.county]: user[User.county],
  [User.email]: user[User.email],
  [User.role]: user[User.role],
  [User.permitions]: user[User.permitions],
  [User.phoneNumber]: user[User.phoneNumber],
  [User.imageUrl]: user.image_url,
  [User.cooperative]: cooperative,
});

const executeLogin = async (user: IUser) => {
  const userReturn = userToSend(user);
  if (user[User.role] === UserRole.Producer) {
    const producer = await findProducerByUser(user[User.id]);
    if (producer) {
      const accessToken = generateAccessToken(userReturn);
      return {
        user: {
          ...userReturn,
          short_code: producer.short_code,
          nif: producer.nif,
          company_name: producer.company_name,
        },
        producer,
        token: accessToken,
      };
    }
    throw new Error(
      'Utilizador inválido, por favor contacte a equipa técnica para mais esclarecimentos'
    );
  }

  if (user[User.role] === UserRole.Cooperative) {
    const cooperative = await findCooperativeByUser(user[User.id]);
    if (cooperative) {
      const result = userToSend(user, cooperative);
      const accessToken = generateAccessToken(result);
      return {
        user: {
          ...userReturn,
          president: cooperative.president,
          is_cooperative: cooperative.is_cooperative,
          nif: cooperative.nif,
        },
        cooperative,
        token: accessToken,
      };
    }
    throw new Error(
      'Utilizador inválido, por favor contacte a equipa técnica para mais esclarecimentos'
    );
  }

  if (user[User.role]) {
    return {
      user: userReturn,
      token: generateAccessToken(userReturn),
    };
  }

  throw new Error(
    'Utilizador inválido, por favor contacte a equipa técnica para mais esclarecimentos'
  );
};

export const serviceLogin = async (email: string, password: string) => {
  const user = await findUserByEmail(email);

  if (user) {
    const isPasswordCorrect = await isPasswordMatching(password, user.password);
    if (isPasswordCorrect) return executeLogin(user);
  }

  return null;
};

export const serviceSignup = async (user: userDTO, extraInfo: Record<string, unknown>) => {
  const userResponse = await createUser(user);

  if (userResponse[User.role] === UserRole.Producer) {
    const producer: ProducerDTO = {
      ...(extraInfo as unknown as ProducerDTO),
      [Producer.userId]: userResponse[User.id],
      [owner]: userResponse[User.id],
    };
    const producerReult = await serviceCreateProducer(producer);
    if (!producerReult) {
      await deleteUser(userResponse[User.id]);

      throw new Error('Lamentamos, ocorreu algum erro ao criar o produtor');
    }
  }

  if (userResponse[User.role] === UserRole.Cooperative) {
    const cooperative: CooperativeDTO = {
      ...(extraInfo as unknown as CooperativeDTO),
      [Cooperative.owner]: userResponse[User.id],
      [Cooperative.userId]: userResponse[User.id],
    };
    const result = await createCooperative(cooperative);
    if (!result) {
      await deleteUser(userResponse[User.id]);

      throw new Error('Lamentamos, ocorreu algum erro ao criar a cooperativa/associação');
    }
  }

  return executeLogin(userResponse);
};

export const serviceUpdateUser = async (id: string, data: Record<string, unknown>) => {
  const { user, especific_information } = data;

  updateUser(id, user);
  const userResponse = user as userDTO;
  if (userResponse[User.role] === UserRole.Producer) {
    const producer: ProducerDTO = {
      ...(especific_information as unknown as ProducerDTO),
    };

    const producerReult = putPeroducerByid(id, producer);

    if (!producerReult) {
      throw new Error('Lamentamos, ocorreu algum erro ao criar o produtor');
    }
  }

  if (userResponse[User.role] === UserRole.Cooperative) {
    const cooperative: CooperativeDTO = {
      ...(especific_information as unknown as CooperativeDTO),
    };

    const result = await updateCooperative(id, cooperative);
    if (!result) {
      // await deleteUser(userResponse[User.id]);

      throw new Error('Lamentamos, ocorreu algum erro ao criar a cooperativa/associação');
    }
  }
};

export const initAdmin = async () => {
  const users = (await findAllUsers()).count;
  if (users === 0) {
    const userAdmin: userDTO = {
      [User.email]: 'admin@admin.com',
      [User.phoneNumber]: '900111222',
      [User.password]: 'admin',
      [User.firstName]: 'Super',
      [User.lastName]: 'Admin',
      [User.role]: 'root',
    };
    await createUser(userAdmin);
    const userRoot: userDTO = {
      [User.email]: 'administrador@incer.ao',
      [User.phoneNumber]: '900111223',
      [User.password]: 'admin@incer',
      [User.firstName]: 'Admin',
      [User.lastName]: 'Incer',
      [User.role]: 'admin',
    };
    await createUser(userRoot);
  }
};

function generatePublicUrl(bucketName: any, objectName: any) {
  const endpoint = process.env.MINIO_PUBLIC_ENDPOINT || 'http://localhost:9000';
  return `${endpoint}/${bucketName}/${objectName}`;
}

export const uploadPhotoToMinio = async (file: File | any): Promise<string> => {
  try {
    const bucketName = 'profile';
    const objectName = `${Date.now()}-${file.originalname}`;

    const bucketExists = await minioClient.bucketExists(bucketName);
    if (!bucketExists) {
      await minioClient.makeBucket(bucketName, 'us-east-1');
    }

    await minioClient.putObject(bucketName, objectName, file.buffer);

    const fileUrl = generatePublicUrl(bucketName, objectName);

    return fileUrl;
  } catch (error) {
    console.error('Erro no upload:', error);
    throw new Error('Falha no upload');
  }
};

export const getAllUsersService = () => findAllUsers();
