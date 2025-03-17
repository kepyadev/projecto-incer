import { cooperativeMock } from '../../__mocks__/entiteis';
import { apiListResponse } from '../../__mocks__/utils';
import APIROUTES from '../../constants/api-routes';
import { Producer } from '../../constants/entities';
import { User } from '../../constants/user';
import { UserRole } from '../../types/user';
import { getRequest, patchRequest, postRequest } from '../utils';
import {
  addExistentProducer,
  addNewProducer,
  getAllCooperative,
  unlinkProducer,
} from '.';

jest.mock('../utils');
describe('COOPERATIVE SERVICES PRODUCER', () => {
  it('Should add existent producer to cooperative', async () => {
    (patchRequest as jest.Mock).mockResolvedValue({});
    await addExistentProducer({ [Producer.Id]: '1' });

    expect(patchRequest).toBeCalledWith(
      APIROUTES.COOPERATIVE_ADD_EXISTENT_PRODUCER,
      {
        [Producer.Id]: '1',
      }
    );
  });

  it('Should add new producer to cooperative', async () => {
    (postRequest as jest.Mock).mockResolvedValue({});
    const producerDTO = {
      [Producer.Nif]: '1442242',
      [Producer.Bi]: '9877999',
      [Producer.User]: {
        [User.FirstName]: 'zebedeu',
        [User.LastName]: 'jorge',
        [User.Phone]: 900222333,
        [User.Role]: UserRole.Producer,
      },
    };
    await addNewProducer(producerDTO);

    expect(patchRequest).toBeCalledWith(
      APIROUTES.COOPERATIVE_ADD_NEW_PRODUCER,
      producerDTO
    );
  });

  it('Should unlink an producer', async () => {
    (patchRequest as jest.Mock).mockResolvedValue({});
    await unlinkProducer({ producer: '1', cooperative: '900' });

    expect(patchRequest).toBeCalledWith(
      `${APIROUTES.COOPERATIVE}/900/unlink-producer`,
      {
        producer: '1',
      }
    );
  });
});

describe('COOPERATIVE SERVICES TECHNICIAN', () => {
  it('Should  get all cooperative', async () => {
    (getRequest as jest.Mock).mockResolvedValue(apiListResponse([cooperativeMock]));
    const response = await getAllCooperative({ limit: 1 });

    expect(getRequest).toBeCalledWith(`${APIROUTES.COOPERATIVE}?limit=1`);
    expect(response).toStrictEqual(apiListResponse([cooperativeMock]));
  });
});
