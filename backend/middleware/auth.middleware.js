require('dotenv').config()
const jwt = require('jsonwebtoken')


const  authMiddleware = (req,res,next)=> {
    const token = req.headers['authorization'];

    if(!token){
        return res.status(401).json({message: 'no token provided'})
    }

    const tokenWihoutBearer = token.split(' ')[1];

    jwt.verify(tokenWihoutBearer, process.env.JWT_TOKEN, (err, decoded)=> {
        if(err){
            return res.status(401).json({message: 'inavlid jwt token'})
        }
        // console.log(decoded.username);
        // console.log(req.userId);
        
        req.userId = decoded.userId;
        console.log(req.userId)
        next();
    })
}
module.exports = authMiddleware