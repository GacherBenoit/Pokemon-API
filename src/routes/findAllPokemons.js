// Import Pokemon model
const { Pokemon } = require('../db/sequelize');

module.exports = (app) => {                                                // Export function who take in parameter all apllication.With this we can separate route simpliest and in different modules
    app.get('/api/pokemons',(req,res) =>{                                  // We use findAll method who return a promise with all pokemons in DB
      if(req.query.name) {     
        console.log(req.query.name)                                            // We extract name parameter with req.query and use if to separate two cases
        const name = req.query.name;
        return Pokemon.findAll({ where: { name: name } })                    // We add where parameter for findAll method to find easily our criterion
        .then(pokemons => {
          const message = `Il y a ${pokemons.length} pokémons qui correspondent au terme de recherche ${name}.`
          res.json({ message, data: pokemons })
        })
      }else {
        Pokemon.findAll()                                                  
          .then(pokemons => {                                              
            const message = 'La liste des pokémons à bien été récupéré.'   
            res.json({message, data: pokemons})                            
          })
          .catch(error => {
            const message = `La liste des pokémons n'as pas pu être récupérée. Réessayez dans quelques instants`
            res.status(500).json({message, data: error}) 
          })
      }                                 
    });
}