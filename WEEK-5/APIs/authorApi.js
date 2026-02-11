import exp from "express"
import { register,authentication } from "../Services/authService.js";
import { userTypeModel } from "../Models/userModel.js";
import { articleModel } from "../Models/articleModel.js";
import { checkAuthor } from "../MiddleWares/checkAuthor.js";
import { verifyToken } from "../MiddleWares/verifyToken.js";

export const authorRoute=exp.Router()

//Register author(public)
authorRoute.post("/users",async(req,res)=> {
    // get user obj from req
    let userObj = req.body;
    // call register func
    const newUserObj = await register({...userObj,role:"AUTHOR"});
    // send res
    res.status(201).json({message:"User created",payload:newUserObj});
})

//Authentic author(public)
authorRoute.post("/authenticate",async(req,res)=> {
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
    res.status(200).json({message:"user login success"})
})

//create article(protected route)
authorRoute.post('/articles',verifyToken,checkAuthor,async(req,res)=>{
    //get article from req
    let article=req.body;

    //create article document
    let newArticleDoc=new articleModel(article)
    //save
    let createdArticleDoc=await newArticleDoc.save()
    //send res
    res.status(201).json({message:"article created",payload:createdArticleDoc})
})

//Read article of author(protected route)
authorRoute.get('/articles/:authorId',verifyToken,checkAuthor,async(req,res)=>{
    //get author id
    let aid=req.params.authorId;
    
    //read article by author
    let articles=await articleModel.find({author:aid,isArticleActive:true}).populate("author","firstName")
    //send res
    res.status(201).json({message:"article found",payload:articles})
})

//edit article(protected Route)
authorRoute.put('/articles',verifyToken,checkAuthor,async(req,res)=>{
    //get modified article from request 
    let {articleId,title,category,content}=req.body;
    //find the article
    let articleofDB=await articleModel.findById(articleId)
    if(!articleofDB){
        res.status(401).json({message:"Article not found"})
    }
    //update the the article
    let updatedArticle=await articleModel.findByIdAndUpdate(
        articleId,
        {
           $set:{title,category,content},
        },
        {new:true}
    )
    res.status(201).json({message:"article updated",payload:updatedArticle})
})

//delete article(soft delete)(protected)
authorRoute.delete('/articles/author/:authorId/article/:articleId',verifyToken,checkAuthor,async(req,res)=>{
    let authorId=req.params.authorId;
    let articleId=req.params.articleId;
    let articleDoc=await articleModel.findOneAndUpdate({_id:articleId,author:authorId},
        {$set:{isArticleActive:false}},
        {new:true}
    )
    if(!articleDoc){
        return res.status(401).json({message:"article not found"})
    }
    res.status(201).json({message:"article deleted successfully",payload:articleDoc})
})