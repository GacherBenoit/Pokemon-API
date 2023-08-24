// fetching express dependency with require keyword from node module folder
const express = require('express')  
// middleware morgan import
const morgan=require('morgan');
// middleware bodyParser import
const bodyParser = require('body-parser');
// Favicon
const favicon = require('serve-favicon');
// Sequelize
const sequelize = require('./src/db/sequelize')
//dotEnv
const dotenv = require('dotenv');
dotenv.config()


// Express instance
const app = express(); // creating an instance of an express application
const port = 3000 // Define a port 

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

sequelize.initDb();

//ENDPOINT
require('./src/routes/findAllPokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)

//ERROR MESSAGES MANAGEMENT
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL'
    res.status(404).json({message})
});

app.listen(port,() => console.log(`Notre app Node est démarré sur : http://localhost:${port}`)); // Start API on port with listen method given by express
// To see modification and not cut every time the server we will use nodemon.
// Nodemon will execute our project in background process.
// He will restart at every code change.
// Just need to add nodemon in script dependencies like this : 
//    "scripts": {
//    "start": "nodemon app.js" 
//    },
