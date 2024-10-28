import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { getCompany, getCompanybyId  ,  registerCompany, updateCompany } from "../controllers/company.controller.js"

const router = express.Router()
router.post("/register" , isAuthenticated , registerCompany)
router.get("/get" , isAuthenticated, getCompany)
router.get('/get/:id',isAuthenticated,getCompanybyId)
router.put('/update/:id',isAuthenticated,updateCompany )


export default router