import socketIo from "socket.io";

export default (socket: socketIo.Socket) => {
  //request the sessions in sockets.
  //find the session.
  console.log("checkout with socket", socket.id);

  socket.on("dataSession", qr_code => {
    console.log(`this is the qr_code that has been sent : ${qr_code}`);
    socket.request.session[qr_code] = socket.id;
    console.log(socket.request.session);
  });

  socket.on("disconnect", () => {
    //filter the socket from the session
  });
};
