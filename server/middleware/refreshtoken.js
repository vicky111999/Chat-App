import jwt from "jsonwebtoken"

export const verifyrefreshToken=(req,res,next)=>{

    const token = req.cookie.refreshToken
    if(!token) return res.status(401).json({message:"no refreshtoken"})

    try{
        const decoded = jwt.verify(token,process.env.RefreshToken)
        req.userId = decoded.id
        next()
    }   
    catch(err){
        return res.status(403).json({message:err.message})
    } 
}
