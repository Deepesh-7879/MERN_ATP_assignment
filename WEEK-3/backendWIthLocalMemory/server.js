//Create HTTP server
//Import express module
import exp from 'express';
import {productApp} from "./APIS/productApi.js";
import { userApp } from './APIS/userApi.js';
//Create HTTP server
const app=exp()
app.listen(3000,()=>console.log('HTTP server listening on port 3000 ...'))
//body parsing middleware
app.use(exp.json());

//forward req to userAppmwhen path starts with '/user-api'
app.use('/user-api',userApp);
app.use('/product-api',productApp);