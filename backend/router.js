import { Router } from "express";

import { user } from "./dbschema.js"
const router  = Router()


router.get("/", async(req, res)=>{
    let records
    try{
         records = await user.find()
    }
    catch(e){console.log(e)}

    if(records) return res.status(200).json({status: "success", records})

})

router.post("/login", async(req, res)=>{

    const {username, password} = req.body
    console.log(username, password)
    
    const userFound  = await user.findOne({username: username, password: password})
    if(userFound){
        res.status(200).json({message: "success"})
    }
   else{
    res.status(404).json({message:"failure"})
   }
    

})

router.post("/register", async(req, res)=>{

    const registrationData = req.body
    console.log(registrationData)
    let records
    try{
        records = await user.create(registrationData)
        
        }
    
    catch{
        res.status(500).json({message: "Server Error"})
    }

    if(records){
        return res.status(200).json({message: "Success", records})
    }


})

export default router