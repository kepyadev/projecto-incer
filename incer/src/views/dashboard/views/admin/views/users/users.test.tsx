import { act, render, screen } from '@testing-library/react';
import React from 'react';

import { userMockList } from '../../../../../../__mocks__/entiteis';
import { apiListResponse } from '../../../../../../__mocks__/utils';
import { User } from '../../../../../../constants/user';
import { getAllUsers } from '../../../../../../services/users';
import UsersView from '.';

jest.mock('../../../../../../services/users');

describe('ADMIN USERS', () => {
  const makeSut = () => render(<UsersView />);

  it('Should render as expected', async () => {
    (getAllUsers as jest.Mock).mockResolvedValue(apiListResponse(userMockList));
    await act(async () => {
      makeSut();
    });

    screen.getByText(/nome/i);
    screen.getByText(/papel/i);

    screen.getByText(
      `${userMockList[0][User.FirstName]} ${userMockList[0][User.LastName]}`
    );
    screen.getByText(`${userMockList[0][User.Role]}`);
  });
});
