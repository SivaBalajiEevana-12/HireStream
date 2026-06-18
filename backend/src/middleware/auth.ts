import jwt from 'jsonwebtoken'

const authMiddleware = (req:any,res:any,next:any)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message:"Authorization header missing"});
    }
    const token = authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"Token missing"});
    }
    try{
        if(!process.env.JWT_SECRET){
            return res.status(500).json({message:"Server configuration error"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.userId = (decoded as any).id;
        next();
    }
    catch(err){
        return res.status(401).json({message:"Invalid token"});
    }
}

export default authMiddleware;