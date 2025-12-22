import express from 'express'
import { Allchats, list, sendmsg } from '../Controller/chat.js'
import { VerifyAuthToken } from '../middleware/auth.js'

const route = express.Router()

route.get('/chat/:id',Allchats)
route.post('/send/:id',VerifyAuthToken,sendmsg)
route.get('/list',list)

export default route