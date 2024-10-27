import express from "express"
import { logout, register, signIn, updateProfile } from "../controllers/user.controller.js"
import {isAuthenticated} from '../middlewares/isAuthenticated.js'
const router= express.Router()


router.post("/sign-up", register)
router.post('/login', signIn)
router.delete('/logout', logout)
router.post('/update', isAuthenticated,updateProfile)
export default router
