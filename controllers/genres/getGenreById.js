const {Genre} = require("../../models/Genres")

module.exports = async function(req, res){  

    try{
        let {id} = req.params;
        let genre = await Genre.findById(id);
        res.status(200).send(genre);
    }catch(error){
        
        res.status(400).send("Invalid ID")
    }

}