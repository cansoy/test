import jwt from "jsonwebtoken"

const isAuthJwt=(req,res,next)=>{
    try {
        const refreshtoken=req.cookies.refreshtoken
        const verify=jwt.verify(refreshtoken,process.env.REFRESH_TOKEN_SCRET)
        req.verify={
                        name:verify.name,
                        pass:verify.pass,
                        dbsavedtoken:verify.dbsavedtoken
                    }
        next()
        return
    } catch (error) {
        res.cookie("refreshtoken","",{maxAge:0,httpOnly:true,sameSite:"none",secure:"none"})
        return res.json({err:`you token expired ! ${Math.random()}`})
    }
}

export default isAuthJwt