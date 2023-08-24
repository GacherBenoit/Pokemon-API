// Import Pokemon model
const { Pokemon } = require('../db/sequelize');
// Import sequelize operator
const { Op } = require('sequelize');
// Import Auth
const auth =require('../auth/auth')

 // Export function who take in parameter all apllication.With this we can separate route simpliest and in different modules
module.exports = (app) => {                                   
    app.get('/api/pokemons',auth,(req,res) =>{                // We just add auth like this , magic of middleware !!! Express accept middleware in second argument    
      if(req.query.name) {                                     // We extract name parameter with req.query and use if to separate two cases                                        
        const name = req.query.name;
        const limit = parseInt(req.query.limit)|| 5            // Need to parse for not send a string for SQL resquest and define at 5 if we don't have parameters by client
        
        if(name.length < 2) {                                  // We check if client send a search with a string'length of 2
          const message = 'Le terme de la recherche doit contenir au moins 2 caractère.'
          return res.status(400).json({message})
        }
        return Pokemon.findAndCountAll({                       // We use findAndCount method who return a promise with all pokemons in DB
           where: {                                            // We use sequilize operator to return a list instead a strict equality if we used previous method( where: {name:name})
             name: {                                           // name is pokemon's model property
        [Op.like]: `%${name}%`                                 // name is our search's criterion
             }
            },
           order: [['name', 'ASC']],                       // We add order by ASC (Alphabetics)
            limit: limit,                                  // We add limit operator to send by req.query.limit                                                 
          })                    
      .then(({count, rows })=> {                           // We get the two variable returned by findAndCountAll (count for number of every group and rows for data)
          const message = `Il y a ${count} pokémons qui correspondent au terme de recherche: ${name}.`
          res.json({ message, data: rows })
        })
      }else {
        Pokemon.findAll(
          {order: [['name', 'ASC']]},                     
        )                                                  
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