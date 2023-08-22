// Import Pokemon model
const { Pokemon } = require('../db/sequelize');

module.exports = (app) => {
    app.delete('/api/pokemons/:id',(req, res) => {
        Pokemon.findByPk(req.params.id).then(pokemon => {
            console.log(req.param.id)
            const pokemonDeleted = pokemon;
            Pokemon.destroy({
                where: { id: pokemon.id }
            })
            .then(_ => {
                const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé`
                res.json({message , data: pokemonDeleted})
            })
        })
    })
}

// In first we find pokemon before delete it for mesage to the client with findByPk method
// And we delete it with destroy method