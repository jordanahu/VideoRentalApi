const jwt = require("jsonwebtoken");


module.exports = async function(req, res, next){

    let token = req.header("x-auth-token");
    if(!token) return res.status(401).send("Not allowed. No Token!");

    try{
        let payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();

    }catch(err){
        res.status(404).send(err.message)
    }
}