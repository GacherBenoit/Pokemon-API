
const express = require('express')  // fetching express dependency with require keyword from node module folder
let pokemons = require('./mock-pokemon');
const helper = require('./helper.js');

const app = express(); // creating an instance of an express application

const port = 3000 // Define a port 

app.get('/',(req,res) => res.send('Hello,Express! ')); // Define endpoint with get method
// First parameter , defautlt URL
// Function with two argument : 
//
//  -req : request object corresponding to the request recieve  by the endpoint
//  -res : response , object to send to the client

//ENDPOINT POKEMON BY ID
app.get('/api/pokemons/:id', (req,res) => {
const id = parseInt(req.params.id); 
const pokemon = pokemons.find((pokemon)=> pokemon.id === id)
const message = 'un pokemon a bien été trouvé';
res.json(helper.success(message,pokemon))
});

//ENDPOINT TOTAL POKEMON COUNT
app.get('/api/pokemons', (req,res) => {
    const pokemonCount = pokemons.length;
    res.send(`Il y a ${pokemonCount} pokémons dans le pokédex, pour le moment`)
});

app.listen(port,() => console.log(`Notre app Node esrt démarré sur : http://localhost:${port}`)); // Start API on port with listen method given by express

// To see modification and not cut every time the server we will use nodemon.
// Nodemon will execute our project in background process.
// He will restart at every code change.
// Just need to add nodemon in script dependencies like this : 
//    "scripts": {
//    "start": "nodemon app.js" 
//    },