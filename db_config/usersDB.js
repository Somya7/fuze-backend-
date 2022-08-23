const { createPool } = require("mysql");
const usersPool = createPool({
  host: "sql6.freemysqlhosting.net",
  port: "3306",
  database: "sql6514513",
  user: "sql6514513",
  password: "qRKTMjbaqc",
  pool: { min: 0, max: 7 },
});

module.exports = usersPool;
