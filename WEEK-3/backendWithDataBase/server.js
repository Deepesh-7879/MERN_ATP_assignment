import exp from "express";
import { userApp } from "./API/userApi.js";
import {connect} from 'mongoose';
import { productApp } from "./API/productApi.js";
const app = exp();

//connect to db server
async function connectDB(){
    try{
    await connect('mongodb://localhost:27017/anuragdb2')
    console.log("DB connection success");
    app.listen(3000,() => console.log("Sever is listening on port 3000"));
    }catch(err){
        console.log("Err in DB connection:",err);
    }
}
connectDB();
app.use(exp.json())
// If path starts with /user-api , forward req to userApp
app.use('/user-api',userApp);
app.use('/product-api',productApp)

