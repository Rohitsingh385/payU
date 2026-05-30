require('dotenv').config()
const jwt = require('jsonwebtoken')


const  authMiddleware = (req,res,next)=> {
    const token = req.headers['authorization']
    const tokenWihoutBearer = token.split(' ')[1];

    jwt.verify(tokenWihoutBearer, process.env.JWT_TOKEN, (err, decoded)=> {
        if(err){
            return res.status(401).json({message: 'inavlid jwt token'})
        }
        req.user = decoded;
        next();
    })
}