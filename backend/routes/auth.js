const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const AuthModel = require("../model/AuthModel");
require("dotenv").config();
router.use(express.urlencoded({extended:true}));
router.use(express.json());
const jwt = require("jsonwebtoken");
const verifyToken = require("./verifyToken");
const secretKey = process.env.SECRET_KEY;


router.post("/login",async (req,res)=>{
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const data = await AuthModel.findOne({email:email});
    console.log("this is recently added",data);
    // .then(data=>{
    //     console.log("exist user",data);
    //     if(data && data._id){
    //         bcrypt.compare(password,data.password,function(err,response){
    //             if(!err){
    //                 if(response){
    //                     const authToken = jwt.sign({_id:data._id,email:data.email},secretKey,{expiresIn:"1d"} );
    //                     res.json({status:"ok",data:{authToken,response,data}});
    //                 }else{
    //                     res.json({status:"ok",data:{data,response}});
    //                 }
    //             }
    //         })
    //     }
    //     })

    if(data && data._id){
            const bcryptvar = await bcrypt.compare(password,data.password);
            console.log(bcryptvar);
            console.log("database password",data.password);
            console.log("postman password",password);
            //     function(err,response){
            //     if(!err){
            //         if(response){
            //             const authToken = jwt.sign({_id:data._id,email:data.email},secretKey,{expiresIn:"1d"} );
            //             res.json({status:"ok",data:{authToken,response,data}});
            //         }else{
            //             res.json({status:"ok",data:{data,response}});
            //         }
            //     }
            // }
        }

    })

router.get("/dashboard",verifyToken,async(req,res)=>{
    if(req.decodedToken){
        res.json({status:"ok",data:"ok"})
    }else{
        res.json({status:"error",data:"error"});
    }
})

router.post("/signup",async (req,res)=>{
    const registeredUserData = {
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
    }
    const salt = await bcrypt.genSalt(10);
    await bcrypt.hash(req.body.password,salt).then(hashedPassword=>{
        if(hashedPassword){
            console.log("hashed password",hashedPassword);
            registeredUserData.password = hashedPassword;
        }
    })
    await AuthModel.create(registeredUserData).then(userStoredData=>{
        if(userStoredData && userStoredData._id){
            res.json({status:"ok",data:userStoredData});
        }
    }).catch(err=>{
        if(err){
        res.json({status:"error",data:err});
        }
    })
})

module.exports = router;