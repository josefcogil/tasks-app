module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'tasks-app',
      user: 'postgres',
      password: 'root'
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }
};
