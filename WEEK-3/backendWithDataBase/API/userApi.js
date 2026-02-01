import exp from "express";
import { userModel } from "../Models/usermodel.js";

// create a mini-express server
export const userApp = exp.Router()

//Create User
userApp.post("/users", async (req, res) => {
    // get new users from req
    let newUser = req.body;
    let newUserDoc = new userModel(newUser);
    //save in db
    await newUserDoc.save()
    res.json({ message: "user created successfully" })
})


//Read user by object id
userApp.get("/users/:id",async(req,res)=>{
    //get object from url param
    let objId=req.params.id;
    //find user by DB
    let userObj=await userModel.findById(objId);
    res.json({message:"user found",payload:userObj})
})


//Update user
userApp.put("/users/:id",async(req,res)=>{
    //get object id from url params
    let objId=req.params.id
    //get modified user from req
    let modifieduser=req.body;
    //make update
    let latestUser=await userModel.findByIdAndUpdate(objId,
        {$set:{...modifieduser}},
        {new:true,runValidators:true})
    //send res
    res.status(200).json({message:"user modified",payload:latestUser})
})

//Delete user
userApp.delete("/users/:id",async(req,res)=>{
    let objId=req.params.id;
    let deleteduser=await userModel.findByIdAndDelete(objId)
    res.status(200).json({message:"user deleted",payload:deleteduser})
})


//Read User
userApp.get("/users",async(req,res) => {
    // read users from db
    let usersList = await userModel.find({})
    res.json({message:"Users data retreived successfully",usersList})
})


