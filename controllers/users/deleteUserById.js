const User = require("../../models/Users");


const [{pick}, {validateId}] = [util=require("../../utils"), util.validateMovie];



module.exports = async function(req, res){
    let {userId:id}= req.params;

    let {error} = validateId(id);
    if(error) return res.status(400).send(error.details[0].message);

    try{
        const deletedUser = await User.findByIdAndRemove(id);
        res.status(200).send(pick(deletedUser, ["name", "email"]));

    }catch(error){
        res.status(400).send(error.message)
    }
   
}