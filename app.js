const express = require('express')  // fetching express dependency with require keyword from node module folder

const app = express(); // creating an instance of an express application
const port = 3000 // Define a port 

app.get('/',(req,res) => res.send('Hello,Express, we come back ! ')); // Define endpoint with get method
// First parameter , defautlt URL
// Function with two argument : 
//
//  -req : request object corresponding to the request recieve  by the endpoint
//  -res : response , object to send to the client

app.listen(port,() => console.log(`Notre app Node esrt démarré sur : http://localhost:${port}`)); // Start API on port with listen method given by express

// To see modification and not cut every time the server we will use nodemon.
// Nodemon will execute our project in background process.
// He will restart at every code change.