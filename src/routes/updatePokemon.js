// Import Pokemon model
const { Pokemon } = require('../db/sequelize');

module.exports = (app) => {
    app.put('/api/pokemons/:id', (req,res) => {
        const id =req.params.id
        Pokemon.update(req.body , {
            where: {id: id}
        })
        .then(_=> {
            Pokemon.findByPk(id).then(pokemon => {
                const message = `Le Pokémon ${pokemon.name} a bien été modifié`
                res.json({message, data:pokemon})
            })
        })
        
    })
}


// We combine two methods: 

// Update to aplly changes in DB
// FindByPk to return information of modified pokemon to the client