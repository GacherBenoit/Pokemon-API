// Import Pokemon model
const { Pokemon } = require('../db/sequelize');


module.exports = (app) => {
    app.get('/api/pokemons/:id', (req,res) => {
    Pokemon.findByPk(req.params.id)
    .then(pokemon => {
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon})
    })
})
}

// We dont need the parseInt method to get the id (req.params.id) , sequelize make the difference