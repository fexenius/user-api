const compression = require("compression");
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
require("dotenv").config();

const usersRouter = require("./routes/users");

const PORT = process.env.PORT || 4000;
const app = express();

app.use(helmet());
app.use(compression());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api/users", usersRouter);

app.listen(PORT, () => {
  console.log(`API listening on port ${process.env.HOST}:${PORT}/api`);
});
