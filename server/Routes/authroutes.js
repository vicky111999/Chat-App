import express from "express"
import { login, logout, refresh, register } from "../Controller/auth.js"

let routes = express.Router()

routes.post('/register',register)
routes.post('/login',login)
routes.post('/logout',logout)
routes.post('/refresh',refresh)

export default routes