import * as http from "http";
import app from "./app";
import db from "./models";
import * as socketIo from "socket.io";
import handleConnection from "./config/socket.config";

const server = http.createServer(app);

const io = socketIo(server);

io.on("connection", handleConnection);

const PORT = 3000;
db.sequelize.sync().then(() => {
  server.listen(PORT);

  server.on("listening", () => {
    console.log(`Listening on port ${PORT}`);
  });
});
