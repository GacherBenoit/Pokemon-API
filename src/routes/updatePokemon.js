// Import Pokemon model
const { Pokemon } = require('../db/sequelize');
// Error validation of Sequelize
const { ValidationError } = require('sequelize');

module.exports = (app) => {
    app.put('/api/pokemons/:id', (req,res) => {
        const id =req.params.id
        Pokemon.update(req.body , {
            where: {id: id}
        })
        .then(_=> {
            return Pokemon.findByPk(id).then(pokemon => {    // We return the promise of findByPk method. Like this if we have an error with this method, we execute the next catch function
                if(pokemon === null) {      
                    const message = `Le pokémon demandé n/ n'exite pas. Réessayez avec un autre identifiant.`
                    res.status(404).json({message}) 
                }
                const message = `Le Pokémon ${pokemon.name} a bien été modifié`
                res.json({message, data:pokemon})
            })
           /*  .catch(error => {
                const message = `Le pokémons n/ n'as pas pu être modifié. Réessayez dans quelques instants`   // We can delete this part of code with the return of findByPk promise
                res.status(500).json({message, data: error}) 
              }) */
        })
        .catch(error => {
            if(error instanceof ValidationError) {
                console.log(error)
                return res.status(400).json({message: error.message, data: error})  //If we have a validation error with sequelize we return an error 400 and send the validator error message (data:error)
            }
            const message = `Le pokémons n/ n'as pas pu être modifié. Réessayez dans quelques instants`
            res.status(500).json({message, data: error}) 
          })
    })
}


// We combine two methods: 

// Update to aplly changes in DB
// FindByPk to return information of modified pokemon to the client