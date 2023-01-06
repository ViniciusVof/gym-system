// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://coaixswd:n1HRqJ-bEOsUVoRdj6_Y4T5SW82I_olv@kesavan.db.elephantsql.com/coaixswd',
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },

  staging: {
    client: 'pg',
    connection: 'postgres://coaixswd:n1HRqJ-bEOsUVoRdj6_Y4T5SW82I_olv@kesavan.db.elephantsql.com/coaixswd',
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  },

  production: {
    client: 'pg',
    connection: 'postgres://coaixswd:n1HRqJ-bEOsUVoRdj6_Y4T5SW82I_olv@kesavan.db.elephantsql.com/coaixswd',
    migrations: {
      directory: './data/migrations',
    },
    seeds: { directory: './data/seeds' },
  }
};
