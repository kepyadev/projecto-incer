import { render, renderHook, screen } from '@client/test-suite';
import { useForm } from 'react-hook-form';

import Filter from '..';
import { InputType } from '../filter.types';
import { makeChips, makeField, makeSelect, makeSwitch } from '../utils';

const handleChange = jest.fn();

describe('Filter', () => {
  it('Should create multiple input', () => {
    const { result } = renderHook(() => useForm());
    const { register } = result.current;
    const fields = [
      { key: 1, type: InputType.Text, name: 'name', label: 'New name', render: makeField },
      {
        key: 2,
        type: InputType.Date,
        name: 'date',
        label: 'New Date',
        role: 'date',
        render: makeField,
      },
      { key: 3, type: InputType.Switch, name: 'check', label: 'New switch', render: makeSwitch },
      { key: 4, type: InputType.Email, name: 'email', label: 'E-mail', render: makeField },
      {
        key: 5,
        type: InputType.Select,
        name: 'Select',
        label: 'New select',
        value: 'yes',
        options: [
          { key: 1, value: 'yes', label: 'Agree' },
          { key: 2, value: 'no', label: 'Decline' },
        ],
        render: makeSelect,
        handleChange,
      },
      {
        key: 6,
        type: InputType.Chip,
        name: 'status',
        value: { accepted: true, pending: true, rejected: false },
        label: {
          accepted: 'accepted',
          pending: 'pending',
          rejected: 'rejected',
        },
        handleChange,
        render: makeChips,
      },
    ];
    render(<Filter fields={fields} register={register} />);

    expect(screen.getByText(/new name/i));
    expect(screen.getAllByRole('textbox')).toHaveLength(2);

    expect(screen.getByText(/e-mail/i));
    expect(screen.getByRole('checkbox'));

    expect(screen.getByText(/new switch/i));

    expect(screen.getByText(/new date/i));
    expect(screen.getByRole('date')).toHaveAttribute('type', 'date');

    expect(screen.getByText(/new select/i));
    expect(screen.getByText(/agree/i));
    expect(screen.getByText(/decline/i));

    expect(screen.getByText(/accepted/i));
    expect(screen.getByText(/pending/i));
    expect(screen.getByText(/rejected/i));
  });
});
