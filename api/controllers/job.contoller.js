import {Job} from '../models/job.model.js'

export const postJob = async(req,res) =>{

    try {
         
        const {title , description , requirements , salary , location , jobType , experience , position, companyId} = req.body;

        const userId= req.id;
        if(!title || !description || !requirements || !salary || !location || !jobType  || !experience ||  !position || !companyId)
        {
            return res.status(400).json({
                success:false,
                message :"Something is missing",
            })
        }
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            experienceLevel:experience,
            salary:Number(salary),
            jobType:jobType,
            location:location,
            position:position,
            company:companyId,
            created_by:userId,
        })

        return res.status(201).json({
            success:true,
            message:"New Job created successfully",
            data:job,
            
        })
    } catch (error) {
        console.log(error)
    }
}


export const getalljobs = async(req,res)=>{
    try {
         const keyword = req.query.keyword || "";
         const query = {
            $or:[
                {title: {$regex: keyword, $options:"i"}} , 
                {description: {$regex: keyword , $options:"i"}}
            ]
         };


         // important 

         const jobs= await Job.find(query).populate({
            path:"company"
         }).sort({createdAt:-1});
         if(!jobs)
         {
            return res.status(404).json({
                message:"Jobs not found",
                success:false,
        })

         }
       
         return res.status(200).json({
            success:true,
            data:jobs,
         })
   

    } catch (error) {
        console.log(error)
    }
}
 

// for students 

export const getjobsByid=  async(req,res)=>{
try {
     const jobId= req.params.id;
     const job= await Job.findById(jobId)
     if(!job)
     {
        return res.status(404).json({
            success:false,
            message:"Jobs not found ",
        })
     }

     return res.status(200).json({
        data:job,
        success:true,
     })
} catch (error) {
    console.log(error)   
}
}


 // no of jobs created by the admin

 export  const getadminjobs = async(req,res)=> {
    try {
         
        const adminid= req.id;
        const jobs = await Job.find({created_by : adminid});
      
            if(!jobs)
                {
                   return res.status(404).json({
                       success:false,
                       message:"Jobs not found ",
                   })
                }
    return res.status(200).json({
        success : true,
        data:jobs,
    
    })
        
    } catch (error) {
        console.log(error)
    }
 }
