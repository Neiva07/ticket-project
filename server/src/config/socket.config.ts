import socketIo from "socket.io";
import { redisClient } from "../server";
import * as redis from "redis";

export default (socket: socketIo.Socket) => {
  //request the sessions in sockets.
  //find the session.
  console.log("checkout with socket", socket.id);

  socket.on("dataSession", qr_code => {
    console.log(`this is the qr_code that has been sent : ${qr_code}`);
    redisClient.set(qr_code, socket.id, redis.print);
  });

  socket.on("disconnect", () => {
    //filter the socket from the session
  });
};
