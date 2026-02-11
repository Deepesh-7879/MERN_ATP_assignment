import { Schema,model } from "mongoose"; 

//Create product schema
const productSchema=new Schema({
    pid:{
        type:Number,
        required:[true,"pid is required"]
    },
    productName:{
        type:String,
        required:[true,"name is required"]
    },
    price:{
        type:Number,
        required:[true,"price is needed"]
    }
},{
    strict:"throw",
    timestamps:true
})

//create product model
export const productModel=model("product",productSchema);