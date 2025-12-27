import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";
import DBconnection from "./config/db.js";
import routes from "./Routes/authroutes.js";
import route from "./Routes/chat.js";
import { socketHandler } from "./socket.js";
dotenv.config();

const app = express();
const server = http.createServer(app);

const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/auth", routes);
app.use("/api/auth", route);

const io = new Server(server, {
  cors: { origin: "http://localhost:5173", credentials: true },
});
socketHandler(io);

server.listen(port, () => {
  console.log(`Server running on ${port}`);
  DBconnection();
});
