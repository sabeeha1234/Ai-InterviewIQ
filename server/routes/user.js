import express from 'express'
import { updateuser } from '../controllers/user-update.js'
import { authmiddleware } from '../middlewears/authmiddleware.js'
const router =express.Router()
router.patch("/updateprofile",authmiddleware,updateuser)
export default router 