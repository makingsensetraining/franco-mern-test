import mongoose from "mongoose";
import {config} from 'dotenv';
import mongooseIdPlugin from "./mongooseIdPlugin";

config();

mongoose.connect(
  `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${
    process.env.DB_HOST
    }/${process.env.DB_NAME}`,
  JSON.parse(process.env.DB_SOCKET_OPTIONS)
);
mongoose.Promise = global.Promise; // Plug native ES6 promises http://mongoosejs.com/docs/promises.html
mongoose.plugin(mongooseIdPlugin); // Applies plugin to all schemas.

const mongodbConnection = mongoose.connection;

mongodbConnection.on("error", error => {
  console.log("Error connecting to mongodb server.", error.message);
});

process.on("SIGINT", () => {
  mongodbConnection.close(() => {
    console.log("Disconnected from mongodb server through app termination.");
    process.exit(0);
  });
});

export default mongodbConnection;
