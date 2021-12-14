const User = require("../../models/Users");
const bcrypt = require("bcrypt");
const {validateUser} = require("../../utils");
const jwt = require("jsonwebtoken");

module.exports = async function(req, res){
    let {email, password} = req.body;
    let {error} = validateUser({email, password}, nameRequired=false);

    if(error) return res.status(400).send(error.details[0].message);

    try{
        let user = await User.findOne({email});
        if(!user) return res.status(400).send("Incorrect password or email");
        let hashedPassword = user.password;
        let passwordIsValid = await bcrypt.compare(password, hashedPassword);
        if(!passwordIsValid) return res.status(400).send("Invalid Password or email");
        if(passwordIsValid){
            let token = user.generateToken();
            res.header("x-auth-token",token).status(200).send("logged In");
        }

    }catch(error){
        res.status(404).send(error.message)
    }
}