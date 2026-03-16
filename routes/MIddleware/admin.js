const jwt = require("jsonwebtoken");

const JWT_SECRET_admin = process.env.AdminMiddleware;

function AdminMiddleware (req, res, next){
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_SECRET_admin)
    if(decoded){
        req.adminId = decoded.id;
        next();
    }else{
        res.status(403).json({
            msg: "Token not provided"
        })
    }
};

module.exports = {
    AdminMiddleware
};