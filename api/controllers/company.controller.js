import { Company } from "../models/company.model.js";

export const registerCompany = async(req,res)=>{

    try {
        const {companyName} = req.body;
        if(!companyName)
        {
            return res.status(400).json({
            message:"company name is required",
            success:false,
            })
        }
        const  company = await Company.findOne({name:companyName}) 
        if(company)
        {
              return res.status(400).json({
                success:false,
                message:"You can't register same company" ,
              })
        }

        
        const newCompany = new Company(
            {
               name:companyName,
               userId:req.id,
            }
        )
    await newCompany.save()
        return res.status(201).json({
            success:true,
            data:newCompany,
            message:"company registered successfully"
        })
    } catch (error) {
        console.log(error)
    }
   
}


export const getCompany = async(req,res)=>{
    try {
        const userId = req.id
        const companies = await Company.find({userId})
        if(!companies)
        {
              return res.status(404).json({
                 message:"companies not found",
                 success:false
              })
        }



        return res.status(200).json({
            data:companies,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}


export const getCompanybyId= async(req,res)=>{
      try {
        const companyId= req.params.id
        const company= await Company.findById(companyId)

        if(!company)
        {
            return res.status(404).json({
                message:"company not found",
                success:false
             })
        }

        return res.status(200).json({
            data:company,
            success:true
        })
      } catch (error) {
        console.log(error)
      }
}


export const updateCompany= async(req,res)=>{
     try {
          const {name, description , website , location} =req.body;
          const file =req.file
          // cloudinary
          const updateData = { name, description,website,location}
          const company = await Company.findByIdAndUpdate(req.params.id, updateData , {new:true})
          if(!company)
          {
             return res.status(404).json({
                success:false,
                message:"company not found "
             })
          }

          return res.status(200).json({
           message:"message information updated ",
            success:true,
      } )



     } catch (error) {
         console.log(error)
     }
}