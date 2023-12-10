import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import passport from "passport"
import LocalStrategy from "passport-local"
import session from "express-session"
import jwt from "jsonwebtoken"
import dotenv from  "dotenv"
import axios from "axios"
import isAuthJwt from "./middlewares/isAuthJwt.js"


dotenv.config()
const server=express()
server.use(cors({origin:"http://localhost:5173",credentials:true}))
server.use(cookieParser())
server.use(express.json())
server.use(session({
    name:"server",
    resave:false,
    saveUninitialized:false,
    secret:"session_secret",
    cookie:{
        httpOnly:true,
        sameSite:"none",
        secure:"none"
    }
}))

// If we use https protocal we can also use session all progress
// server.use(passport.initialize())
// server.use(passport.session())

passport.use(
        new LocalStrategy.Strategy
                    (
                        {usernameField:"username",passwordField:"password"},
                        (u,p,cb)=>{
                            if (u=="muhammed" && p=="cansoy" ) {
                                return cb(null,{name:u,pass:p,dbsavedtoken:"dbsavedtoken"},{message:"you done well"})
                            }
                                return(cb(null,false,{message:"you failed try again"}))
                        }
                    )
            )

passport.serializeUser((userObj,cb)=>cb(null,userObj))
passport.deserializeUser((userObj,cb)=>cb(null,userObj))

server.get("/",(req,res)=>{
    res.json({data:"wellcome"})
})

server.post("/login",passport.authenticate("local"),(req,res)=>{
    const authInfo=req.authInfo
    const user =req.user
    const accesstoken=jwt.sign(user,process.env.ACCESS_TOKEN_SCRET,{expiresIn:"1m"})
    const refreshtoken =jwt.sign(user,process.env.REFRESH_TOKEN_SCRET,{expiresIn:"5h"})
    res.cookie("refreshtoken",refreshtoken,{maxAge:1000*60*60*5,httpOnly:true,sameSite:"none",secure:"none"})
    res.json({user:user,authInfo:authInfo,accesstoken:accesstoken})
})

server.get("/users",isAuthJwt,async(req,res)=>{
    const refreshtoken =jwt.sign(req.verify,process.env.REFRESH_TOKEN_SCRET,{expiresIn:"5h"})
    res.cookie("refreshtoken",refreshtoken,{maxAge:1000*60*60*5,httpOnly:true,sameSite:"none",secure:"none"})
    const users =await axios.get("https://jsonplaceholder.typicode.com/users")
    const data=await users.data
    res.json({data:data})
})

server.listen(3000,()=>console.log("--------------------------------------------"))