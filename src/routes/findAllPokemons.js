// Import Pokemon model
const { Pokemon } = require('../db/sequelize');

module.exports = (app) => {                                                // Export function who take in parameter all apllication.With this we can separate route simpliest and in different modules
    app.get('/api/pokemons',(req,res) =>{                                  // We use findAll method who return a promise with all pokemons in DB
        Pokemon.findAll()                                                  //
          .then(pokemons => {                                              //
            const message = 'La liste des pokémons à bien été récupéré.'   // 
            res.json({message, data: pokemons})                            //We return a response
          })
    })
}