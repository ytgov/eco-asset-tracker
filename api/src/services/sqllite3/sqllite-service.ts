export const knex = require('knex')({
  client: 'sqlite3', // or 'better-sqlite3'
  connection: {
    // filename: ":memory:"
    filename: "./db/mydb.sqlite"
  }
});


