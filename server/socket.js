import jwt from "jsonwebtoken";
import cookie from "cookie";
import chat from "./models/Message.js";

export const socketHandler = (io) => {
  io.use((socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const token = cookies.accessToken;
    if (!token) return next(new Error("Unauthorized"));
    try {
      const decode = jwt.verify( token , process.env.AccessToken);
      socket.userId = decode.id;
      next();
    } catch {
      next(new Error("forbidden"));
    }
  });

  io.on("connection", (socket) => {
    socket.join(socket.userId);
    socket.on("privatemessage", async ({ receiver, text }) => {
      const msg = new chat({
        sender: socket.userId,
        receiver,
        text,
      });
      await msg.save();
      io.to(receiver).emit("receivemessage", msg);
      io.to(socket.userId).emit("receivemessage", msg);
    });
    socket.on("typing", ({ receiver }) => {
      socket.to(receiver).emit("typing", { sender: socket.userId });
    });
  });
};
