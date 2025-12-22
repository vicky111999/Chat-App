import jwt from 'jsonwebtoken'

export const VerifyAuthToken =(req,res,next)=>{

    const token = req.cookies?.accessToken
    
    if (!token) return res.status(401).json({message:"Unauthorized"})

    try{
        const decoded = jwt.verify(token,process.env.AccessToken)
        req.userId = decoded.id
        next()
    }
    catch(err){
        return res.status(403).json({message:err.message})
    }
}