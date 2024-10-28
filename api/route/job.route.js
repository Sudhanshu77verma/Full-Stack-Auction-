import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"

import { getadminjobs, getalljobs, getjobsByid, postJob } from "../controllers/job.contoller.js"

const router = express.Router()
router.post("/post" , isAuthenticated ,postJob )
router.get("/getalljobs" , isAuthenticated,getalljobs )
router.get('/getadminJobs',isAuthenticated,getadminjobs)
router.get('/get/:id',isAuthenticated,getjobsByid )


export default router