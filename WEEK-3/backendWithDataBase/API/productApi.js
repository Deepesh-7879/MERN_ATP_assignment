import exp from "express";
import {productModel} from "../Models/productmodel.js";

export const productApp=exp.Router();

//Read list
productApp.get("/products",async(req,res)=>{
    //read fromm db
    let productList=await productModel.find({})
    res.json({message:"product data retrivedsuccessfully",payload:productList})
})

//Create list
productApp.post("/products",async(req,res)=>{
    let newProduct=req.body;
    let newproductDoc=new productModel(newProduct)
    let a=await newproductDoc.save()
    res.json({message:"product created successfully",payload:a})
})

//Get by id
productApp.get("/products/:pid",async(req,res)=>{
    let prodId=req.params.pid;
    let foundId=await productModel.findById(prodId);
    res.json({message:"product found",payload:foundId})
})

//update product
productApp.put("/products/:pid",async(req,res)=>{
    let prodId=req.params.pid;
    let modifiedProduct=req.body;
    let latestProduct=await productModel.findByIdAndUpdate(prodId,{$set:{...modifiedProduct}},{new:true})
    res.json({message:"updated successfully",payload:latestProduct})
})