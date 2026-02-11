import exp from "express"
import {articleModel} from "../Models/articleModel.js"
import { userTypeModel } from "../Models/userModel.js";
import { register,authentication } from "../Services/authService.js";
import { verifyToken } from "../MiddleWares/verifyToken.js";

export const userRoute=exp.Router();


//Register User
userRoute.post('/users',async(req,res)=>{
    //get user obj from req
    let userObj=req.body;
    //call register
    const newUserObj=await register({...userObj,role:"USER"});
    res.status(201).json({message:"User created",payload:newUserObj})
})

//Read all articles(protected route)
userRoute.get('/articles',verifyToken,async(req,res)=>{
    let articles=await articleModel.find({})
    res.status(400).json({message:"all articles are",payload:articles})
})

// add comment to article (protected)
userRoute.put("/users/:userId/article/:articleId",verifyToken,async (req, res) => {
      const { userId, articleId } = req.params;
      const { comment } = req.body;
      // check article
      const articleObj = await articleModel.findById(articleId);
      if (!articleObj || !articleObj.isArticleActive) {
        return res.status(404).json({ message: "Article not found" });
      }
      // check user
      const userObj = await userTypeModel.findById(userId);
      if (!userObj) {
        return res.status(404).json({ message: "User not found" });
      }
      const newComment = {
        user: userObj._id,
        comment: comment,
      };
      const modifiedArticle = await articleModel.findByIdAndUpdate(
        articleId,
        { $push: { comments: newComment } },
        { new: true, runValidators: true }
      );
      res.status(201).json({message: "Comment added successfully",payload: modifiedArticle});
  }
);
