import * as http from "http";
import app from "./app";
import db from "./models";
import socketManager from "./config/socket.config";
import * as socketIo from "socket.io";
// import * as redisStore from "connect-redis";
import * as redis from "redis";
import * as session from "express-session";

export const redisClient = redis.createClient();

redisClient.on("connect", () => console.log("Redis client connected"));

const server = http.createServer(app);

export const io = socketIo(server);

io.on("connection", socketManager);

const PORT = 3000;
db.sequelize.sync().then(() => {
  server.listen(PORT);

  server.on("listening", () => {
    console.log(`Listening on port ${PORT}`);
  });
});
