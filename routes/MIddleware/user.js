const jwt = require("jsonwebtoken");
const JWT_SECRET_user = process.env.JWT_SECRET_user;


function UserMiddleware (req, res, next){
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_SECRET_user);
    if(decoded){
        req.userId = decoded.id;
        next();
    }else{
        res.status(403).json({
            msg: "Token not provided"
        })
    } 
}


module.exports = {
    UserMiddleware
}