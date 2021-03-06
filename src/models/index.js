/* eslint-disable no-sync */
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from 'modules/config';
import { getLogger } from 'modules/logging';

const log = getLogger('Sequelize');
const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
const db = {};

const { database, username, password, host, dialect } = config.mysql;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  logging: false
});

sequelize
  .authenticate()
  .then(() => {
    log.info('Database connection has been established successfully.');
  })
  .catch((err) => {
    log.error('Unable to connect to the database:', err);
  });

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);

    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

export default db;
