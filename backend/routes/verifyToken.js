const jwt = require("jsonwebtoken");
require("dotenv").config();
const express = require("express");
const router = express.Router();
router.use(express.urlencoded({extended:true}));
router.use(express.json());
const secretKey = process.env.SECRET_KEY;
const verifyToken = (req,res,next)=>{
    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader?.split(" ")[1];

    console.log("token is ",token);
    if(!token){
        res.status(403).send("A token is required for authentication");
    }else{
        try{
            const decodedToken = jwt.verify(token,secretKey);
            req.decodedToken = decodedToken;
        }catch{
            res.json({status:"error",data:"something went wrong"});
        }
    }
    return next();
}

module.exports = verifyToken;