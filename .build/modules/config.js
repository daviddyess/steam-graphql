"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.steam = exports.session = exports.mysql = exports.aws = exports.arangodb = exports.api = void 0;

require("dotenv/config");

var api = {
  port: parseInt(process.env.PORT || 3939, 10)
};
exports.api = api;
var arangodb = {
  url: process.env.ARANGO_URL,
  databaseName: process.env.ARANGO_DB,
  auth: {
    username: process.env.ARANGO_USER,
    password: process.env.ARANGO_PW
  },
  devData: process.env.DEV_DATA
};
exports.arangodb = arangodb;
var aws = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  defaultRegion: process.env.AWS_DEFAULT_REGION || 'us-east-1',
  s3Bucket: process.env.AWS_S3_BUCKET,
  s3BaseUrl: "https://".concat(process.env.AWS_S3_BUCKET, ".s3-").concat(process.env.AWS_DEFAULT_REGION || 'us-east-1', ".amazonaws.com/")
};
exports.aws = aws;
var mysql = {
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PW,
  database: process.env.MYSQL_DB,
  dialect: 'mysql'
};
exports.mysql = mysql;
var session = {
  ttl: process.env.SESSION_TTL,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET
};
exports.session = session;
var steam = {
  steamAPIKey: process.env.STEAM_API_KEY
};
exports.steam = steam;
var _default = {
  api: api,
  arangodb: arangodb,
  aws: aws,
  mysql: mysql,
  session: session,
  steam: steam
};
exports["default"] = _default;