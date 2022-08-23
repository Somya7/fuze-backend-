const {
  create,
  checkUser,
  getUserByUserId,
  getUserByUserEmail,
} = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    // console.log("signup", body);

    // to check if user already exist
    checkUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: 0, message: "BD connection  error" });
      } else if (results.length !== 0) {
        return res.status(200).json({
          success: 0,
          message: "User Already Exist",
        });
      } else if (results.length === 0) {
        //   encrypting password
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        // if user not already registered insert user details in db
        create(body, (err, results) => {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .json({ success: 0, message: "BD connection  error" });
          } else {
            res.status(200).json({
              success: 1,

              message: "Sign Up Successfull",
            });
          }
        });
      }
    });
  },

  login: (req, res) => {
    const body = req.body;
    console.log(body);
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      //   to check if user has not signed up
      if (!results) {
        return res.json({
          success: 0,
          message: "Email Does Not Exist",
        });
      }
      //   if user completed sign up process allow login after comparing password
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        //adding user id in  payload and keeping jwt expiration period as 10 days
        const jsontoken = sign({ result: results.id }, "qwe1234", {
          algorithm: "HS256",
          expiresIn: "10d",
        });
        //sending token as response on succssfull login
        return res.json({
          success: 1,
          message: "Login successfull",
          token: jsontoken,
        });
      } else {
        //   give response of invalid incase wrong password entered
        return res.json({
          success: 0,
          message: "Invalid  Password",
        });
      }
    });
  },

  userInformation: (req, res) => {
    //   decoding userID from payload
    const body = req.decoded.result;

    // console.log("body", body);
    getUserByUserId(body, (err, results) => {
      if (err) {
        console.log("err", err);
      } else if (results) {
        // console.log("user", results);
        return res.json({
          data: results,
        });
      }
    });
  },
};
