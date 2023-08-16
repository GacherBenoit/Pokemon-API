// fetching express dependency with require keyword from node module folder
const express = require('express')  

//Data
let pokemons = require('./mock-pokemon');

// Message module import with destructuring
const {success} = require('./helper.js');

// middleware morgan import
const morgan=require('morgan');

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


//ENDPOINT POKEMON BY ID
app.get('/api/pokemons/:id', (req,res) => {
const id = parseInt(req.params.id); 
const pokemon = pokemons.find((pokemon)=> pokemon.id === id)
const message = 'un pokemon a bien été trouvé';
res.json(success(message,pokemon))
});

//ENDPOINT POKEMONS LIST
app.get('/api/pokemons', (req,res) => {
    const message = 'Voici la liste de tout les pokémons dans le pokédex:'
    res.json(success(message,pokemons))
});

app.listen(port,() => console.log(`Notre app Node esrt démarré sur : http://localhost:${port}`)); // Start API on port with listen method given by express

// To see modification and not cut every time the server we will use nodemon.
// Nodemon will execute our project in background process.
// He will restart at every code change.
// Just need to add nodemon in script dependencies like this : 
//    "scripts": {
//    "start": "nodemon app.js" 
//    },
