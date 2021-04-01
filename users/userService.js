const pool = require("../database/dbConfig");

module.exports = {
  create: (data, callBack) => {
    pool.query(`
            INSERT INTO User(mail,password,admin) VALUES (?,?,0)`,
      [
        data.mail,
        data.password
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUsers: callBack => {
    pool.query(
      `SELECT idUser,mail FROM User`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserByUserId: (id, callBack) => {
    pool.query(
      `SELECT idUser,mail FROM User WHERE idUser = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  getUserByUserEmail: (mail, callBack) => {
    pool.query(
      `SELECT * from User where mail = ?`,
      [mail],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  updateUser: (data, callBack) => {
    pool.query(
      `UPDATE User set mail=?, password=? where idUser = ?`,
      [
        data.mail,
        data.password,
        data.idUser
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  deleteUser: (data, callBack) => {
    pool.query(
      `DELETE FROM User where idUser = ?`,
      [data.idUser],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  }

};