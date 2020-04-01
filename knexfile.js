module.exports = {
    development: {
      client: 'sqlite3',
      connection: {
        filename: './database/knights.db3'
      },
      useNullAsDefault: true,
      migrations: {
        directory: './database/migrations'
      },
      seeds: {
        directory: './database/seeds'
      },
      pool: {
        afterCreate: (conn, done) => {
          conn.run('PRAGMA foreign_keys = ON', done);
        }
      }
    },
    testing: {
      client: 'sqlite3',
      connection: {
        filename: './database/knights.db3'
      },
      pool: {
        min: 2,
        max: 10,
        afterCreate: (conn, done) => {
          conn.run('PRAGMA foreign_keys = ON', done);
        }
      },
      migrations: {
        directory: './database/migrations',
        tableName: 'knex_migrations'
      }
    }
  
    // production: {
    //   client: 'pg',
    //   connection: process.env.DATABASE_URL,
    //   // connection: "postgres:// username : password @ addressToServer:5432 / databaseName"
    //   // connection: {
    //   //   host: 'db.ourcompany.com',
    //   //   user: 'me',
    //   //   password: 'mini me',
    //   //   database: 'school'
    //   // }
    //   pool: {
    //     min: 2,
    //     max: 10
    //   },
    //   migrations: {
    //     directory: './database/migrations',
    //     tableName: 'knex_migrations'
    //   }
    // }
  };