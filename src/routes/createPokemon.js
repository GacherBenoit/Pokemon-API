// Import Pokemon model
const { Pokemon } = require('../db/sequelize');
// Error validation of Sequelize
const { ValidationError, UniqueConstraintError } = require('sequelize');
// Import Auth
const auth =require('../auth/auth')

module.exports = (app) => {
    app.post('/api/pokemons',auth, (req,res) => {
        Pokemon.create(req.body)
        .then(pokemon => {
            const message = `Le pokémon ${req.body.name} a bien été crée.`
            res.json({ message, data:pokemon })
        })
        .catch(error => {
            if(error instanceof ValidationError) {
                return res.status(400).json({message: error.message, data: error})  //If we have a validation error with sequelize we return an error 400 and send the validator error message (data:error)
            }
            if(error instanceof UniqueConstraintError) { // If we have a uniqueness constraint error define for Name property
                return res.status(400).json({ message: error.message, data:error})
            }
            const message = `Le pokémons n/ n'as pas pu être ajouté. Réessayez dans quelques instants`
            res.status(500).json({message, data: error}) 
          })
    })
}



// PROBLEM WITH TYPE PROPERTY IN CONSOLE :ValidationError [SequelizeValidationError]: notNull Violation: Pokemon.type cannot be null

// type:["Plante","Poisson"]  Api Rest Side we have an arrray
// type:"Plante,Poisson"      DB we have a string

// Solution in pokemon Model to custom Getters and Setters