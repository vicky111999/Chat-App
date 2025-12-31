import express from "express";
import { Allchats, list } from "../Controller/chat.js";
import { VerifyAuthToken } from "../middleware/auth.js";

const route = express.Router();

route.get("/chat/:id",VerifyAuthToken, Allchats);
route.get("/list",VerifyAuthToken, list);

export default route;
