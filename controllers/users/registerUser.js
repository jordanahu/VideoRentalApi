const User = require("../../models/Users");
const bcrypt = require("bcrypt")
const {validateUser, pick} = require("../../utils");

module.exports = async function(req, res){
    let {name, email, password} = req.body;

    let {error} = validateUser({name, email, password});
    if(error) return res.status(400).send(error.details[0].message)

    const foundUser = await User.findOne({email});
    if(foundUser) return res.status(404).send("Error registering user");

    try{

        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await new User({name, email, password:hashedPassword});

        await user.save();
        res.status(201).send(pick(user, ["name", "email"]));
    }catch(err){
        res.status(404).send(err.message)
    }


}