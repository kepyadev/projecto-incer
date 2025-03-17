// eslint-disable-next-line import/no-extraneous-dependencies
import { act, renderHook } from '@testing-library/react-hooks';

import useAsyncState, { SnackMessage } from '../use-async-state';

const errorData: Error = {
  name: 'error example',
  message: 'this is an error message example',
};

interface Example {
  text: string;
}

const exampleData: Example = {
  text: 'ola',
};
const snackMessageExample: SnackMessage = {
  message: 'this is a snack message example',
  isError: false,
};

const makeSut = () => renderHook(() => useAsyncState());
describe('useAsyncState', () => {
  describe('LOADING STATE', () => {
    it('Return as expected', () => {
      const { result } = makeSut();

      expect(result.current.loading).toBeFalsy();
    });

    it('sets loading to a different value, and returns it', () => {
      const { result } = makeSut();

      act(() => {
        result.current.setLoading(true);
      });

      expect(result.current.loading).toBeTruthy();

      act(() => {
        result.current.setLoading(false);
      });

      expect(result.current.loading).toBeFalsy();
    });

    it('sets loading to the same value, and returns the same value ', () => {
      const { result } = makeSut();
      expect(result.current.loading).toBeFalsy();

      act(() => {
        result.current.setLoading(true);
      });
      expect(result.current.loading).toBeTruthy();

      act(() => {
        result.current.setLoading(true);
      });
      expect(result.current.loading).toBeTruthy();
    });
  });

  describe('SUCCESS STATE', () => {
    it('Return as expected', () => {
      const { result } = makeSut();

      expect(result.current.success).toBeFalsy();
    });

    it('sets success to a different value, and returns it', () => {
      const { result } = makeSut();

      act(() => {
        result.current.setSuccess(true);
      });

      expect(result.current.success).toBeTruthy();

      act(() => {
        result.current.setSuccess(false);
      });

      expect(result.current.success).toBeFalsy();
    });

    it('sets success to the same value, and returns the same value ', () => {
      const { result } = makeSut();
      expect(result.current.success).toBeFalsy();

      act(() => {
        result.current.setSuccess(true);
      });
      expect(result.current.success).toBeTruthy();

      act(() => {
        result.current.setSuccess(true);
      });
      expect(result.current.success).toBeTruthy();
    });
  });

  describe('ERROR STATE', () => {
    it('Return as expected', () => {
      const { result } = makeSut();

      expect(result.current.error).toBe(null);
    });

    it('sets error to a different value, and returns it', () => {
      const { result } = makeSut();

      act(() => {
        result.current.setError(errorData);
      });

      expect(result.current.error).toBe(errorData);

      act(() => {
        result.current.setError(null);
      });

      expect(result.current.error).toBe(null);
    });

    it('sets error to the same value, and returns the same value ', () => {
      const { result } = makeSut();
      expect(result.current.error).toBe(null);

      act(() => {
        result.current.setError(errorData);
      });
      expect(result.current.error).toBe(errorData);

      act(() => {
        result.current.setError(errorData);
      });
      expect(result.current.error).toBe(errorData);
    });
  });

  describe('DATA STATE', () => {
    const makeSutData = () => renderHook(() => useAsyncState<Example>());
    it('Return as expected', () => {
      const { result } = makeSutData();

      expect(result.current.data).toBeNull();
    });

    it('sets error to a different value, and returns it', () => {
      const { result } = makeSutData();

      act(() => {
        result.current.setData(exampleData);
      });

      expect(result.current.data).toBe(exampleData);

      act(() => {
        result.current.setData(null);
      });

      expect(result.current.data).toBe(null);
    });

    it('sets error to the same value, and returns the same value ', () => {
      const { result } = makeSutData();
      expect(result.current.data).toBe(null);

      act(() => {
        result.current.setData(exampleData);
      });
      expect(result.current.data).toBe(exampleData);

      act(() => {
        result.current.setData(exampleData);
      });
      expect(result.current.data).toBe(exampleData);
    });
  });

  describe('SANCKMESSAGE STATE', () => {
    it('returns as expected', () => {
      const { result } = makeSut();
      expect(result.current.snackMessage).toBeNull();
    });

    it('sets the snackMessage and returns it', () => {
      const { result } = makeSut();
      expect(result.current.snackMessage).toBeNull();

      act(() => {
        result.current.setSnackMessage(snackMessageExample);
      });
      expect(result.current.snackMessage).toBe(snackMessageExample);

      act(() => {
        result.current.setSnackMessage(null);
      });
      expect(result.current.snackMessage).toBeNull();
    });
  });
});
