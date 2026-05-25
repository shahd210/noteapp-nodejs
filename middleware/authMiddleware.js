const jwt =require("jsonwebtoken")
const authMiddleware = (req ,res ,next)=>{
    try {
        //get token from req.header
        const authHeader = req.headers.authorization;
        if(!authHeader) return res.status(401).json({msg:"token required"})
        //get token value -> string token
const token = authHeader.split(" ")[1];

        //token value verify -> payload
   const payload = jwt.verify(token , process.env.JWT_SK);
 req.user = payload.id;
        //next
        next();
    } catch (error) {
       next(error)
    }
}

module.exports = authMiddleware;