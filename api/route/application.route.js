import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { applyjob, getApplicants, getappliedjob, updatestatus } from "../controllers/application.controller.js"


const router = express.Router()
router.post('/apply/:id' , isAuthenticated, applyjob )
router.get('/get' , isAuthenticated, getappliedjob)
router.get('/:id/applicants', isAuthenticated,getApplicants )
router.put('/status/:id/update' , isAuthenticated, updatestatus) ;

export default router
