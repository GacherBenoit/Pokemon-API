// Import Pokemon model
const { Pokemon } = require('../db/sequelize');

module.exports = (app) => {
    app.delete('/api/pokemons/:id',(req, res) => {
        Pokemon.findByPk(req.params.id).then(pokemon => {
            if(pokemon === null) {
                const message = `Le pokémon demandé n/ n'exite pas. Réessayez avec un autre identifiant.`
                return res.status(404).json({message})
            }

            const pokemonDeleted = pokemon;
            return Pokemon.destroy({  // Return is used to factorized code 500 error , if we have one we the return will send the code execution to the next .catch
                where: { id: pokemon.id }
            })
            .then(_ => {
                const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé`
                res.json({message , data: pokemonDeleted})
            })
        })
        .catch(error => {
            const message = `Le pokémons n/ n'as pas pu être supprimé. Réessayez dans quelques instants`
            res.status(500).json({message, data: error}) 
          })
    })
}

// In first we find pokemon before delete it for mesage to the client with findByPk method
// And we delete it with destroy method