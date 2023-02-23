const express = require("express");
const passport = require("passport");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const { ORIGIN, REMOTE_ORIGIN } = process.env; // configurar su origen en env (en mi caso es ORIGIN=127.0.0.1 pero puede ser ORIGIN=localhost)

require("./db.js");

const server = express();

server.name = "API";

server.use(morgan("dev"));

server.use(express.json());
server.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    ORIGIN ? `http://${ORIGIN}:5173` : REMOTE_ORIGIN
  ); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
server.use(passport.initialize());

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;