import { Server, Socket } from "socket.io";
import { verifyToken } from "../helpers/tokenManager";
import { getEnv } from "../config/env";
import { isAdminRole } from "../constants/roles";
import type { TokenPayload } from "../interfaces/tokenPayload";

type SocketDataUser = { user?: TokenPayload };

export default (io: Server) => {
  const env = getEnv();

  io.use((socket, next) => {
    const authToken = (socket.handshake.auth as { token?: string })?.token;
    const hdr = socket.handshake.headers.authorization;
    const bearer =
      typeof hdr === "string" && hdr.startsWith("Bearer ")
        ? hdr.slice(7)
        : undefined;
    const raw = authToken || bearer;

    const data = socket.data as SocketDataUser;

    if (!env.SOCKET_AUTH_REQUIRED) {
      if (raw) {
        const decoded = verifyToken(raw);
        if (decoded) {
          data.user = decoded;
        }
      }
      return next();
    }

    if (!raw) {
      return next(new Error("Unauthorized"));
    }
    const decoded = verifyToken(raw);
    if (!decoded) {
      return next(new Error("Unauthorized"));
    }
    data.user = decoded;
    return next();
  });

  io.on("connection", (socket: Socket) => {
    const user = (socket.data as SocketDataUser).user;
    if (isAdminRole(user?.roleId ?? null)) {
      socket.join("admins");
    }
    console.info(
      "Cliente conectado:",
      socket.id,
      user ? `role=${user.roleId}` : "guest"
    );
  });
};
