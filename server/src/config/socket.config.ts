import socketIo from "socket.io";
import { redisClient } from "../server";
import * as redis from "redis";

export default (socket: socketIo.Socket) => {
  //request the sessions in sockets.
  //find the session.
  console.log("checkout with socket", socket.id);

  socket.on("dataSession", qr_code => {
    console.log(`this is the qr_code that has been sent : ${qr_code}`);
    redisClient.hmset("qrCodeSocket", qr_code, socket.id, redis.print);
  });

  socket.on("disconnect", data => {
    console.log("data", data);
    // filter the socket from the session
    redisClient.hgetall("qrCodeSocket", (err, dataObj) => {
      console.log("dataobj", dataObj);
      const qr_code = Object.keys(dataObj).find(
        qr_code => dataObj[qr_code] === socket.id
      );
      console.log(qr_code);
      console.log(redisClient.hdel("qrCodeSocket", qr_code, redis.print));
    });
  });
};
