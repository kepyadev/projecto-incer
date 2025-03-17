// eslint-disable-next-line import/prefer-default-export
export const formatFetchParams = (page: unknown, limit: unknown) => ({
  page: parseInt(page as unknown as string, 10),
  limit: parseInt(limit as unknown as string, 10),
});

export interface PaginationParams {
  page: number;
  limit: number;
}

export const isOwner = (idUserOn: string, idOWnerOnResource: string) =>
  idUserOn === idOWnerOnResource;
