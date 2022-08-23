const usersPool = require("../db_config/usersDB");
module.exports = {
  //check already user there
  checkUser: (data, callback) => {
    email = data.email.trim();
    usersPool.query(
      `SELECT email FROM users WHERE email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },

  // to create user
  create: (data, callback) => {
    usersPool.query(
      `INSERT INTO users (name ,  email, password) VALUES(?,?,?)`,
      [data.name, data.email, data.password],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  //search for user by email during login
  getUserByUserEmail: (email, callBack) => {
    usersPool.query(
      `select email,password ,id from users where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  //to get user info by user id query
  getUserByUserId: (id, callBack) => {
    usersPool.query(
      `select email,name from users where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
