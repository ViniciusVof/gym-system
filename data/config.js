import knex from 'knex';

const knexfile = require('../knexfile');

const env = proccess.env.NODE_ENV || 'development';
const configOptions = knexfile[env];

module.exports = knex(configOptions);