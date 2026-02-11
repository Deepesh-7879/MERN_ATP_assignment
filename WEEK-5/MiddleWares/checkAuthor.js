import {userTypeModel} from '../Models/userModel.js'

export const checkAuthor=async(req,res,next)=>{
    //get author id
    let authorId=req.params.authorId || req.body.author;
    //verify author
    let verifiedAuthor=await userTypeModel.findById(authorId)
    //if author not found
    if(!verifiedAuthor){
        return res.status(401).json({message:"author invalid"})
    }
    //if author found but role is different
    if(verifiedAuthor.role !== "AUTHOR"){
        return res.status(403).json({message:"user is not an author"})
    }
    //if author blocked
    if(!verifiedAuthor.isActive){
        return res.status(403).json({message:"author account is not active"})
    }
    next();
}