/* eslint-disable @typescript-eslint/no-unused-vars-experimental */
import { Client } from '@elastic/elasticsearch';

const node = process.env.ELASTICSEARCH_HOST || 'http://35.194.12.68';

// eslint-disable-next-line no-console
console.log('ELASTICSEARCH HOST', node);
const elasticClient = new Client({ node });

export default elasticClient;

export const getMyElasticId = async (
  mongoId: string,
  index: string,
  type: string = '_doc',
  elastic: Client
): Promise<string> => {
  const result = (await elastic.search({
    index,
    body: { query: { bool: { must: [{ match: { id: mongoId } }] } } },
  })) as any;

  // eslint-disable-next-line no-underscore-dangle
  return result.hits.hits.map((item: any) => item._id)[0];
};

export const DeleteElasticSearch = async (
  index: string,
  type: string = '_doc',
  mongoid: string,
  client: Client
) =>
  client.delete({
    index,
    id: await getMyElasticId(mongoid, index, type, elasticClient),
  });

export const UpdateElasticSearch = async (
  index: string,
  type: string = '_doc',
  mongoid: string,
  body: Record<string, any>,
  client: Client
) =>
  client.update({
    index,
    id: await getMyElasticId(mongoid, index, type, client),
    body: { doc: body },
  });

export const extractInfoFromElasticSearch = (data: any) => ({
  // eslint-disable-next-line no-underscore-dangle
  data: data.body.hits.hits.map((item: any) => ({ ...item._source, _id: item._source.id })),
  count: data.body.hits.total.value,
});
