const cookieParser = require("cookie-parser");
const JWT = require("jsonwebtoken");

const verifyToken = (req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        // console.log(token);
        if(!token) res.status(401).send("Please Login First")
            
        const result = JWT.verify(token,process.env.JWT_SECRECT);
        if(!result) res.status(401).send("pls login again");

        req.user = result;
        next();
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports = verifyToken;