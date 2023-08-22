// Import Pokemon model
const { Pokemon } = require('../db/sequelize');


module.exports = (app) => {
    app.get('/api/pokemons/:id', (req,res) => {
    Pokemon.findByPk(req.params.id)
    .then(pokemon => {
        if(pokemon === null) {
            const message = `Le pokémon demandé n/ n'exite pas. Réessayez avec un autre identifiant.`
            return res.status(404).json({message})}
            
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon})
    })
    .catch(error => {
        const message = `Le pokémons n/ n'as pas pu être récupérée. Réessayez dans quelques instants`
        res.status(500).json({message, data: error}) 
      })
})
}

// We dont need the parseInt method to get the id (req.params.id) , sequelize make the difference