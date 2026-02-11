import exp from 'express'
import { register,authentication } from '../Services/authService.js';
import { userRoute } from './userApi.js';
import { userTypeModel } from '../Models/userModel.js';
import bcrypt from 'bcryptjs';

export const commonRoute = exp.Router();

//login
commonRoute.post('/login',async(req,res)=>{
    // get user credentials obj
        let userCred = req.body;
        // call authenticate service
        let {token , user} = await authentication(userCred);
        // save token as httpOnly
        res.cookie("token",token,{
            httpOnly:true,
            sameSite:"lax",
            secure:false
        })
        // send res
        res.status(200).json({message:"user login success",user})
})

//logout for user ,author,admin
commonRoute.post('/logout',(req,res) => {
    //clear the cookie named token
    res.clearCookie('token',{
        httpOnly:true,
        secure:false,
        sameSite:"lax"
    });
    res.status(200).json({message:"logged out successfully"})
})

//change password
commonRoute.put('/change-password/:userId',async(req,res)=>{
    let uid = req.params.userId;
    let {oldPassword,newPassword} = req.body;
    let userDoc = await userTypeModel.findById(uid);
    if(!userDoc || !userDoc.isActive){
        return res.status(403).json({message:"user not found"});
    }
    let userAuth = await bcrypt.compare(oldPassword,userDoc.password);
    console.log(userAuth);
    if(userAuth == false){
        return res.status(401).json({message:"password is wrong"})
    }
    let newPass = await bcrypt.hash(newPassword,10);
    let modifiedUser = await userTypeModel.findByIdAndUpdate(uid,{
        $set:{password:newPass}
    },{
        new:true,
        runValidators:true
    })
    res.status(201).json({message:"password updated successfully"})
})