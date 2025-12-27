import express from "express";
import { login, logout, me, refresh, register } from "../Controller/auth.js";
import { VerifyAuthToken } from "../middleware/auth.js";

let routes = express.Router();

routes.post("/register", register);
routes.post("/login", login);
routes.post("/logout", logout);
routes.post("/refresh", refresh);
routes.get("/me", VerifyAuthToken, me);

export default routes;
