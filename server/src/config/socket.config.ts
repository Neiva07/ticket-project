import socketIo from "socket.io";
//import all listeners of socket events
export default (socket: socketIo.Socket) => {
  console.log(socket.id);
};
