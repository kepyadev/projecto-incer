import { fireEvent, render, renderHook, screen, userEvent } from '@client/test-suite';
import { useForm } from 'react-hook-form';

import { InputType } from '../filter.types';
import { makeField, makeRadioField, makeSelect, makeSlider, makeSwitch } from '../utils';

describe('Utils', () => {
  const { result } = renderHook(() => useForm());
  const { register } = result.current;
  const handleChange = jest.fn();
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should create Textfield with type text', () => {
    const field = {
      key: 0,
      type: InputType.Text,
      name: 'text',
      label: 'Name',
      render: makeField,
    };
    render(makeField(field, register));
    expect(screen.getByRole('textbox', { name: 'text' })).toHaveAttribute('type', 'text');
  });

  it('Should create Textfield with type email', () => {
    const field = {
      key: 0,
      type: InputType.Email,
      name: 'email',
      label: 'E-mail',
      render: makeField,
    };
    render(makeField(field, register));
    expect(screen.getByRole('textbox', { name: 'email' })).toHaveAttribute('type', 'email');
  });

  it('Should create Textfield with type date', () => {
    const field = {
      key: 0,
      type: InputType.Date,
      name: 'date',
      label: 'Data',
      role: 'textbox',
      render: makeField,
    };
    render(makeField(field, register));
    expect(screen.getByRole('textbox', { name: 'date' })).toHaveAttribute('type', 'date');
  });

  it('Should create Select', () => {
    const field = {
      key: 3,
      type: InputType.Select,
      name: 'nome',
      label: 'Select',
      options: [
        { key: 1, value: 'sim', label: 'Agree' },
        { key: 2, value: 'nao', label: 'Decline' },
      ],
      value: 'sim',
      handleChange,
      render: makeSelect,
    };
    render(makeSelect(field));
    expect(screen.getByText(/Agree/i)).toBeInTheDocument();
    expect(screen.getByText(/Decline/i)).toBeInTheDocument();
  });

  it('Should call handleChange method on change event', () => {
    const field = {
      key: 3,
      type: InputType.Select,
      name: 'nome',
      label: 'Select',
      options: [
        { key: 1, value: 'sim', label: 'Agree' },
        { key: 2, value: 'nao', label: 'Decline' },
      ],
      value: 'sim',
      handleChange,
      render: makeSelect,
    };
    render(makeSelect(field));
    expect(screen.getByRole('select')).toBeInTheDocument();
    expect(screen.getByText(/Agree/i)).toBeInTheDocument();
    expect(screen.getByText(/Decline/i)).toBeInTheDocument();
    fireEvent.change(screen.getByRole('select'), { target: { value: 'nao' } });

    expect(handleChange).toBeCalledWith('nao');
  });

  it('Should create Radio', () => {
    const field = {
      key: 3,
      type: InputType.Radio,
      name: 'radio',
      label: 'Radio',
      role: 'radio',
      options: [
        { key: 1, value: 'sim', label: 'agree' },
        { key: 2, value: 'other', label: 'decline' },
      ],
      defaultValue: 'sim',
      render: makeRadioField,
    };
    render(makeRadioField(field));
    expect(screen.getAllByRole('radio')).toHaveLength(3);
    expect(screen.getByLabelText(/agree/i)).toBeChecked();
    expect(screen.getByLabelText(/decline/i)).not.toBeChecked();
  });

  it('Should call handleChange method on change event', () => {
    const field = {
      key: 3,
      type: InputType.Radio,
      name: 'radio',
      label: 'Radio',
      role: 'radio',
      options: [
        { key: 1, value: 'sim', label: 'agree' },
        { key: 2, value: 'other', label: 'decline' },
      ],
      defaultValue: 'sim',
      handleChange,
      render: makeRadioField,
    };
    render(makeRadioField(field));
    expect(screen.getAllByRole('radio')).toHaveLength(3);
    expect(screen.getByLabelText(/agree/i)).toBeChecked();
    expect(screen.getByLabelText(/decline/i)).not.toBeChecked();

    userEvent.click(screen.getByLabelText(/decline/i));
    expect(handleChange).toBeCalledWith('other');
  });

  it('Should create switch', () => {
    const field = {
      key: 3,
      type: InputType.Switch,
      name: 'switch',
      label: 'Switch',
      checked: true,
      render: makeSwitch,
      handleChange,
    };
    render(makeSwitch(field));
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox);
  });
  it('Should call handleChange method', () => {
    const field = {
      key: 3,
      type: InputType.Switch,
      name: 'switch',
      label: 'Switch',
      checked: true,
      render: makeSwitch,
      handleChange,
    };
    render(makeSwitch(field));
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox);

    userEvent.click(checkbox);
    expect(handleChange).toBeCalledWith(false);
  });

  it('Should create slider', () => {
    const field = {
      key: 1,
      type: InputType.Slider,
      name: 'slider',
      label: 'Label slider',
      limit: 100,
      value: [13, 20],
      ariaLabel: 'slider',
      handleChange,
      handleIncrement: handleChange,
      render: makeSlider,
    };
    render(makeSlider(field));

    const addButton = screen.getByRole('button');

    userEvent.click(addButton);

    screen.getAllByRole('slider');
    screen.getByText('13');
    screen.getByText('20');
    expect(handleChange).toBeCalled();
  });
});
