const usersRouter = require("./users_api/user.routes");
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(cors());
const bodyparser = require("body-parser");
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyparser.json());
const port = process.env.PORT || 4000;

app.get("/hello", (req, res) => {
  res.send("Node Assignment");
});
app.use("/", usersRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
