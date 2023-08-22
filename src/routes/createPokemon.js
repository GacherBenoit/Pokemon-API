const { Pokemon } = require('../db/sequelize');

module.exports = (app) => {
    app.post('/api/pokemons', (req,res) => {
        Pokemon.create(req.body)
        .then(pokemon => {
            const message = `Le pokémon ${req.body.name} a bien été crée.`
            res.json({ message, data:pokemon })
        })
    })
}



// PROBLEM WITH TYPE PROPERTY IN CONSOLE :ValidationError [SequelizeValidationError]: notNull Violation: Pokemon.type cannot be null

// type:["Plante","Poisson"]  Api Rest Side we have an arrray
// type:"Plante,Poisson"      DB we have a string

// Solution in pokemon Model to custom Getters and Setters