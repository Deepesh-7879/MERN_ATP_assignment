import exp from "express"
import { articleModel } from "../Models/articleModel.js"
import { userTypeModel } from "../Models/userModel.js"
import {checkAuthor} from "../MiddleWares/checkAuthor.js"

export const adminRoute=exp.Router()


//read all articles
adminRoute.get('/articles',async(req,res)=>{
    let article=await articleModel.find({})
    res.status(400).json({message:"All articles are",payload:article})
})

//block user
adminRoute.put('/users-block/:userId',async(req,res)=>{
    let uid=req.params.userId;
    let userDoc=await userTypeModel.findById(uid)
    if(!userDoc){
        res.status(400).json({message:"user not found"})
    }
    let blockUser=await userTypeModel.findByIdAndUpdate(uid,
        {$set:{isActive:false}},
        {new:true}
    )
    res.status(400).json({message:"user blocked",payload:blockUser})
})

//unblock user
adminRoute.put('/users-unblock/:userId',async(req,res)=>{
    let uid=req.params.userId;
    let userDoc=await userTypeModel.findById(uid)
    if(!userDoc){
        res.status(400).json({message:"user not found"})
    }
    let unblockUser=await userTypeModel.findByIdAndUpdate(uid,
        {$set:{isActive:true}},
        {new:true}
    )
    res.status(400).json({message:"user Unblocked",payload:unblockUser})
})
