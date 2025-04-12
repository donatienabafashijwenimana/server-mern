import jwt from 'jsonwebtoken'
import users from '../model/usermodel.js'
export const protectroute = async(req,res,next)=>{
    try{
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if(!token) return res.status(400).json({message:'no token provided'})
        
        const decoded = jwt.verify(token,process.env.secret_key)
        if (!decoded) return res.status(401).json({message:'invalid token'})
        const userid = decoded.userid
        const user = await users.findById(userid).select("-password")
        if (!user) return res.status(400).json('user not found')
        req.user=user

        next()

        }catch(error){
        console.log(error.message)
        res.status(500).json('internal server error')
    }
}