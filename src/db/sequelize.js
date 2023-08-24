// Sequelize import with datatypes for models
const {Sequelize, DataTypes} = require('sequelize');
//Data
const pokemons = require('./mock-pokemon');
// import Pokemon Model
const PokemonModel = require('./../models/pokemon');
const UserModel = require('../models/user');
//import BCRYPT
const bcrypt = require('bcrypt');


// SEQUELIZE INIT
const sequelize = new Sequelize (
    'pokedex',  // DB name
    'root',  // userName of database (root by default on mariadb)
    '', // password of Database
    {
        host : process.env.host, // host
        dialect:'mariadb', // Driver use for sequelize
        dialectOptions : {
            timezone: 'Etc/GMT-2'
        },
        logging: false
    }
)

const Pokemon = PokemonModel(sequelize, DataTypes);        // Create an instance of pokemon model to create our table in db
const User = UserModel(sequelize, DataTypes);        // Create an instance of user model to create our table in db

const initDb = () => {
    sequelize.sync({force:true})  // !!!! this option delete the table associate to every models , we lost data of table at every restart. Its ok for the de momment to work with fresh entity.
    .then(_ => {

        pokemons.map(pokemon => {         // Use Array to push in DB
            Pokemon.create({                
                name:pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture: pokemon.picture,
                types:pokemon.type/* .join() */  // the type property is a string in the database but an array in the API, so the join method generates a string by concataining with a comma. Use split method in other way ( DB to API ) 
              }).then(bulbizzare => console.log(bulbizzare.toJSON())) // We use then because create return a promise. Sequelize make a request to DB , wait a response and tell us if a pokemon was added to the right table.
                                                                      // toJSON method is recommand to show correctly informations of model's instance
            })
        
            bcrypt.hash(process.env.password,10) // Hash method take 2 parameters , first one the password and the salt rounds in second parameters
            .then(hash => User.create({ username:process.env.username, password:hash}))
            .then(user => console.log(user.toJSON()))
        
            console.log('la base de donné "Pokedex" a bien été synchronisée')  // synchronize our method with DB                                                      
            })
    }



module.exports = {
    initDb, Pokemon, User
}      

