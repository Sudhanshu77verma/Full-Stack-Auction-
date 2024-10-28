import {Application} from '../models/application.js'
import { Job } from '../models/job.model.js';

export const applyjob= async(req,res)=>{
     try {

        const userId= req.id;
        const jobid= req.params.id;
        if(!jobid)
        {
            return res.status(400).json({
                success:false,
                message:"Job id is required "
            })
        }
       
        // check if user already has already applied for the job 
        const existingApplication = await Application.findOne({job:jobid, applicant:userId}) ;
        if(existingApplication)
        {
            return res.status(400).json({
                success:false,
                message:"Already applied to this application"
            })
        }
     
        // checking  if  job exists 
      const job = await Job.findById(jobid)
       if(!job)
       {
           return res.status(404).json({
            success:false,
            message:"Job Not Found ",

           })
       }
     const newApplication = await Application.create({
        job:jobid,
        applicant:userId
     })


      
     job.applications.push(newApplication._id) 
      await job.save()
      return res.status(201).json({
        success:true,
        message:"Job Applied Successfully"
      })



     } catch (error) {
         console.log(error)
     }


    }

 
    // applied for which jobs 
    

    export const getappliedjob = async(req,res)=>{
    
   try {
      const userId= req.id;
      const application = await Application.find({applicant:userId}).sort({createdAt:-1})
      .populate({ 
        path:"job" ,
         options:{sort:{createdAt:-1}}, 
       populate :{
        path:"company",
        options:{sort:{createdAt:-1}}
       }
    
    
    })

    if(!application)
    {
        return res.status(404).json({
            success:false,
            message:"No application"
        })
    }
    return res.status(200).json({
        success:true,
        data:application
    })

        
   } catch (error) {
    console.log(error)
   }

    }
  

    // admin  dekhega kitna user ne apply kiya
    export const getApplicants = async(req,res)=>{
        try {
              const jobid = req.params.id
                const job = await Job.findById(jobid).populate(
                    {
                        path:"applications",
                     options:{sort:{createdAt:-1}},
                     populate:{
                        path:"applicant",
                     }
                    }
                )    
                
                if(!job)
                {
                    return res.status(404).json({
                        message:"Job not found ",
                        success:false,
                    })
                }
                 return res.status(201).json({
                    success:true,
                     data:job
                 })
        } catch (error) {
            console.log(error)
        }
    }

 export const updatestatus= async(req,res)=>{
    try {
         const {status }=  req.body;
          const applicationId= req.params.id

          if(!status)
         {
            return res.status(400).json({
                success:false,message:"status is required"
            })
         }
         const application = await Application.findOne({_id:applicationId})
          if(!application)
          {
            return res.status(400).json({
                success:false,message:"application not found "
            })
          } 
    
          // update the statsu 

          application.status = status.toLowerCase()
          await application.save()
          return res.status(200).json({
            message:"status updated successfully",
            success:true
          }

          )

    } catch (error) {
        console.log(error)
    }
 }