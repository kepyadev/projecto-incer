import useSWR, { SWRConfiguration } from 'swr';

import { AllowedQueryKeys, HttpResponse } from '../services/services.types';

interface UseAPIArgs<T> {
  id: string;
  fetcher: (params?: AllowedQueryKeys) => Promise<HttpResponse<T>>;
  fetcherParams?: AllowedQueryKeys;
  config?: SWRConfiguration;
}

export default function useAPI<T>({
  id,
  config = { revalidateOnFocus: true },
  fetcher,
  fetcherParams,
}: UseAPIArgs<T>) {
  const { error, data, mutate, isValidating } = useSWR<HttpResponse<T>>(
    id,
    () => fetcher(fetcherParams),
    config
  );
  return {
    loadingSwr: (!data && !error) || isValidating,
    error,
    data: data?.data,
    response: data,
    mutate,
    isValidating,
  };
}
