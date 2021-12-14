const User = require("../../models/Users");


module.exports = async function(req, res){

    try{

        const users = await User.find();

        res.status(200).send(users)

    }catch(err){
        res.status(400).send(err.message)
    }
}