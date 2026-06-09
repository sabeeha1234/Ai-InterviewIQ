import express from 'express'
import { liveinterview } from '../controllers/auth/interview.js'
import { authmiddleware } from '../middlewears/authmiddleware.js'

const router = express.Router()
router.post('/liveinterview',authmiddleware,liveinterview)

export default router