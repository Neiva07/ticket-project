import socketIo from "socket.io";
import { redisClient } from "../server";
import * as redis from "redis";

export default (socket: socketIo.Socket) => {
  //event to receive the qr code and save on redis
  socket.on("dataSession", qr_code => {
    redisClient.hmset("qrCodeSocket", qr_code, socket.id, redis.print);
  });

  //event to delete from redis the key-value pair that was disconnected
  socket.on("disconnect", () => {
    redisClient.hgetall("qrCodeSocket", (err, dataObj) => {
      console.log("dataobj", dataObj);
      const qr_code = Object.keys(dataObj).find(
        qr_code => dataObj[qr_code] === socket.id
      );
      redisClient.hdel("qrCodeSocket", qr_code, redis.print);
    });
  });
};
