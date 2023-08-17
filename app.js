// fetching express dependency with require keyword from node module folder
const express = require('express')  

//Data
let pokemons = require('./mock-pokemon');

// Message module import with destructuring
const {success, getUniqueId} = require('./helper.js');

// middleware morgan import
const morgan=require('morgan');

// middleware bodyParser import
const bodyParser = require('body-parser');

// Favicon
const favicon = require('serve-favicon');

const app = express(); // creating an instance of an express application

const port = 3000 // Define a port 

app.get('/',(req,res) => res.send('Hello,Express! ')); // Define endpoint with get method
// First parameter , defautlt URL
// Function with two argument : 
//
//  -req : request object corresponding to the request recieve  by the endpoint
//  -res : response , object to send to the client


//MIDLEWARE SERVE ICON

app.use(favicon(__dirname = './favicon.ico'))


//MIDLEWARE LOG
// We use it to see URL call in terminal and debug

                                                        //Homemade version
app.use(morgan('dev'))                                  /* app.use((req,res,next) => {
                                                        console.log(`URL: ${req.url}`)
                                                        next()
                                                        }) */

//MIDLEWARE BODY-PARSER
// Use to parse data recieve with HTPP in JSON 

app.use(bodyParser.json())

//ENDPOINT POKEMON BY ID
app.get('/api/pokemons/:id', (req,res) => {
const id = parseInt(req.params.id); 
console.log(req.body)
const pokemon = pokemons.find((pokemon)=> pokemon.id === id)    
const message = 'un pokemon a bien été trouvé';
res.json(success(message,pokemon))
});

//ENDPOINT POKEMONS LIST
app.get('/api/pokemons', (req,res) => {
    const message = 'Voici la liste de tout les pokémons dans le pokédex:'
    res.json(success(message,pokemons))
});

// ENDPOINT ADD POKEMON
// We need to parse the Data with a middleware, the Data aren't reicieve in JSON format
app.post('/api/pokemons', (req,res)=> {
    const id= getUniqueId(pokemons);                                                                  // Define a id
    const pokemonCreated = {...req.body, ...{id: id, created: new Date()}}          // Merge data recieve by request and add an id and a date
    pokemons.push(pokemonCreated)                                                   
    const message = `Le pokemon ${pokemonCreated.name} a bien été crée , le voici ${pokemonCreated.picture}`
    res.json(success(message,pokemonCreated))
})

// ENDPOINT MODIFY POKEMON
app.put('/api/pokemons/:id', (req,res)=> {
    const id = parseInt(req.params.id);
    const pokemonUpdated ={...req.body, id:id};
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon;
    });
    const message = `Le pokemon ${pokemonUpdated} a bien été modifié`;
    res.json(success(message, pokemonUpdated));
})

// ENDPOINT DELETE A POKEMON
app.delete('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const pokemonToDelete=pokemons.find(pokemon => pokemon.id === id); // Find in pokemon array , pokemon who will be deleted to specify in message
    pokemons.filter(pokemon =>pokemon.id !== id); // Filter and have a new array without the pokemon deleted (remember,filter method send a new array) 
    const message = `Le ${pokemonToDelete.name} a bien été supprimé !`
    res.json(success(message,pokemonToDelete));
})



app.listen(port,() => console.log(`Notre app Node esrt démarré sur : http://localhost:${port}`)); // Start API on port with listen method given by express

// To see modification and not cut every time the server we will use nodemon.
// Nodemon will execute our project in background process.
// He will restart at every code change.
// Just need to add nodemon in script dependencies like this : 
//    "scripts": {
//    "start": "nodemon app.js" 
//    },
