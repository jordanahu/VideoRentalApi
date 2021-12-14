const {Genre} = require("../../models/Genres");

module.exports = async function deleteGenre(req, res){
    
        try{
          let {id} = req.params
          let deletedGenre = await Genre.findByIdAndRemove(id);

          res.send(deletedGenre);

        }catch(err){

           res.status(400).send("Invalid ID")
        }

   
   
}
