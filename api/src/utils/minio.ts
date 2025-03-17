// Configuração do cliente MinIO
import * as Minio from 'minio';

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: `${process.env.MINIO_ACCESS_KEY}`,
  secretKey: `${process.env.MINIO_SECRET_KEY}`,
});

export default minioClient;
