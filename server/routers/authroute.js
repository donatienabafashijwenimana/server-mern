import express from 'express'

import { login,register,logout,updateprofile, checkauth } from "../controller/authController.js";
import {protectroute} from '../middleware/authmiddleware.js'
const router = express.Router()

router.post('/register', register)

router.post('/login', login)

router.post('/logout', logout)

router.put("/updateprofile",protectroute,updateprofile )

router.get("/check",protectroute,checkauth)
export default router