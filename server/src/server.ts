import * as http from "http";
import * as socketIo from "socket.io";
import * as redis from "redis";
import app from "./app";
import db from "./models";
import socketManager from "./config/socket.config";

export const redisClient = redis.createClient();

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
