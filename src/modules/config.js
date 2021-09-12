import 'dotenv/config';

export const api = {
  port: parseInt(process.env.PORT || 3939, 10)
};

export const arangodb = {
  url: process.env.ARANGO_URL,
  databaseName: process.env.ARANGO_DB,
  auth: { username: process.env.ARANGO_USER, password: process.env.ARANGO_PW },
  devData: process.env.DEV_DATA
};

export const aws = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  defaultRegion: process.env.AWS_DEFAULT_REGION || 'us-east-1',
  s3Bucket: process.env.AWS_S3_BUCKET,
  s3BaseUrl: `https://${process.env.AWS_S3_BUCKET}.s3-${
    process.env.AWS_DEFAULT_REGION || 'us-east-1'
  }.amazonaws.com/`
};

export const mysql = {
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PW,
  database: process.env.MYSQL_DB,
  dialect: 'mysql'
};
export const session = {
  ttl: process.env.SESSION_TTL,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET
};

export const steam = {
  steamAPIKey: process.env.STEAM_API_KEY
};
export default {
  api,
  arangodb,
  aws,
  mysql,
  session,
  steam
};
