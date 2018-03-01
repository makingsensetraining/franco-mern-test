import express from "express";
import { config as envConfig } from "dotenv";
import jwt, { UnauthorizedError } from "express-jwt";
import jwksRsa from "jwks-rsa";
import bodyParser from "body-parser";
import webpack from "webpack";
import path from "path";
import config from "../webpack.config";
import open from "open";
import mongodbConnection from "./database/mongodb";
import addApiRoutes from "./addApiRoutes";

// load .env configuration
envConfig();

/* eslint-disable no-console */

const app = express();
const compiler = webpack(config);

app.use("/static", express.static(__dirname + "../app"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: process.env.AUTH0_JWKS_URI
    }),
    algorithms: ["RS256"]
  }).unless({
    path: [
      "/",
      new RegExp(/data:font/),
      new RegExp(/login|callback|favicon|webpack|static/)
    ]
  })
);

app.use(
  require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  })
);
app.use(require("webpack-hot-middleware")(compiler));

addApiRoutes(app);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../app/index.html"));
});

app.use((err, req, res, next) => {
  if (err instanceof UnauthorizedError && err.code === "credentials_required") {
    res.redirect("/");
  }
});

mongodbConnection.once("open", () => {
  console.log("Mongodb server connected.");

  app.listen(process.env.API_PORT, err => {
    if (err) return console.log(err);
    open(`${process.env.API_HOST}:${process.env.API_PORT}`);
  });
});
