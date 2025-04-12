import jwt from 'jsonwebtoken'

export const generatetoken =(userid,res)=>{
    const token = jwt.sign({userid},process.env.secret_key,{
        expiresIn:"1d",
    });
    res.cookie("token",token,{
        maxAge:7*24*60*60*100,
        httpOnly:true,
        sameSite:'strict',
        secure:process.env.NODE_ENV !='development'
    })
    return token

}