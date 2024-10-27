import jwt from 'jsonwebtoken'

export const isAuthenticated  = async(req,res,next)=>{
    try {
       
          const token = req.cookies.token ;
          if(!token)
          {
            return res.status(401).json({
                message:"User not Authenticated",
                success:false,
            })
          }

          const decode =  jwt.verify(token , process.env.JWT_SECRET)
          if(!decode)
          {
             return res.status(401).json({
                message:"Invalid token",
                success:false,
             })
          }

          console.log("decode is"  , decode)
       req.id= decode.userId;
       console.log(req.id)
       next()
            
    } catch (error) {
        console.error("Authentication error:", error)
        return res.status(500).json({
          message: "Internal Server Error",
          success: false,
    })

    }
}
