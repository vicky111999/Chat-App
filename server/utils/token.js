import jwt from "jsonwebtoken"

export const createAccesstoken=(userid)=>{
    console.log("token",userid)
    const  token = jwt.sign({userid},process.env.AccessToken,{expiresIn:"15m"})
    console.log(token)
    return token
}

export const createrefreshToken=(userid)=>{
    const token = jwt.sign({userid},process.env.RefreshToken,{expiresIn:"7d"})
    return token
}