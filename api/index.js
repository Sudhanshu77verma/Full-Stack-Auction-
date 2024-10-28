import express from  "express"
 import mongoose from "mongoose"
 import dotenv from "dotenv"
 import userrouter from './route/user.route.js'
import cookieParser from "cookie-parser"
import cors from "cors"
import companyrouter from './route/company.route.js'
import jobrouter from './route/job.route.js'
 dotenv.config()
const Port = process.env.PORT || 3000
mongoose.connect(process.env.MONGO)
.then(()=>console.log("db is connected") )
.catch((error)=>console.log(error)
) 
const app= express()
const corsoptions = {
    origin:"http//localhost:5173",
    credentials:true,
}

 app.use(cors(corsoptions))

app.use(express.json())

app.use(cookieParser())


app.use('/api/v1/user' , userrouter)
app.use('/api/v1/company' , companyrouter)
app.use('/api/v1/job',jobrouter)
app.listen(Port , ()=>{
    console.log(`Server is running at ${Port}`)
})
