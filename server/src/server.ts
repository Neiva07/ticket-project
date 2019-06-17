import * as http from "http";
import app from "./app";
import db from "./models";
import socketManager from "./config/socket.config";
import * as socketIo from "socket.io";
import * as redisStore from "connect-redis";
import * as redis from "redis";
import * as session from "express-session";
import userRoutes from "./modules/Users/routes/users.routes";
import ticketRoutes from "./modules/Tickets/routes/tickets.routes";
import ticketCheckerRoutes from "./modules/Tickets/routes/ticketChecker.routes";
// import * as sharedSession from "express-socket.io-session";

const RedisStore = redisStore(session);

const client = redis.createClient();

const server = http.createServer(app);

export const io = socketIo(server);

export const ClientStore = new RedisStore({
  host: "localhost",
  port: 6379,
  client
});

const sessionMiddleware = session({
  store: ClientStore,
  secret: process.env.REDIS_SECRET,
  saveUninitialized: true,
  // key: 'express.sid',
  resave: true
});

io.use((socket: socketIo.Socket, next) => {
  sessionMiddleware(socket.request, socket.request.res, next);
});
app.use(sessionMiddleware);

userRoutes(app);
ticketRoutes(app);
ticketCheckerRoutes(app);
io.on("connection", socketManager);

const PORT = 3000;
db.sequelize.sync().then(() => {
  server.listen(PORT);

  server.on("listening", () => {
    console.log(`Listening on port ${PORT}`);
  });
});
