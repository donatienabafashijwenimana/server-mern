import express from 'express'
import { protectroute } from '../middleware/authmiddleware.js'
import {get_user_for_sideber, getLastMessage, getmessages,statusmessagetoeachuser,
        sendmessage, statusmessage, updatereadmessage} from '../controller/messagecontrollers.js'
const router = express.Router()

router.get('/users',protectroute,get_user_for_sideber)
router.get('/getmessage/:id',protectroute,getmessages)
router.post('/send/:id',protectroute,sendmessage)
router.get('/last/:id',protectroute,getLastMessage)
router.put("/updatestatusmessage/:senderid",protectroute,updatereadmessage)
router.get('/fetchstatusmessage',protectroute,statusmessage)
router.get('/fetchstatusmessagetoeachuser/:userid',protectroute,statusmessagetoeachuser)

export default router