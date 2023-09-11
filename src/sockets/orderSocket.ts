import { Server, Socket } from "socket.io";

export default (io: Server) => {
  io.on("connect", (socket: Socket) => {
    console.log("Cliente conectado:", socket.id);
  });
};
