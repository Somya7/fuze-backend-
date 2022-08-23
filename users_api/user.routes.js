const { createUser, login, userInformation } = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../auth/tokenValidation");

router.post("/users", createUser);
router.post("/users/login", login);

// checkTToken validation added to check if correct jwt token is present in request header
router.get("/users", checkToken, userInformation);
module.exports = router;