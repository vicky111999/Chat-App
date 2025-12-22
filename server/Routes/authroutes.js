import express from "express"
import { login, refresh, register } from "../Controller/auth.js"

let routes = express.Router()

routes.post('/register',register)
routes.post('/login',login)
routes.post('/refresh',refresh)

export default routes