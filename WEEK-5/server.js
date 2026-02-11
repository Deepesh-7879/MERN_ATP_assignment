import exp from "express"
import { connect } from "mongoose"
import { config } from "dotenv"
import {userRoute} from "./APIs/userApi.js"
import { adminRoute} from "./APIs/adminApi.js"
import {authorRoute} from "./APIs/authorApi.js"
import cookieParser from "cookie-parser"
import { commonRoute } from "./APIs/commonApi.js"

config()//prrocess .env

const app=exp()
//add body parse middleware
app.use(exp.json())
//add cookie parser middleware
app.use(cookieParser())

//connect API'S
app.use('/user-api',userRoute)
app.use('/author-api',authorRoute)
app.use('/admin-api',adminRoute)
app.use('/common-api',commonRoute)


const connectDB=async()=>{
    try{
    await connect(process.env.DB_URL)
    console.log("DB connection success");
    app.listen(process.env.PORT,()=>console.log("server started"))
    }catch(err){
        console.log("error occured",err)
    }
}
connectDB()

//dealing with invalid path
app.use((req,res,next)=>{
    console.log(req.url);
    res.json({message: `${req.url} Invalid path`});
});

//error handling
app.use((err,req,res,next)=>{
    console.log({message:"error",reason:err.message})
})