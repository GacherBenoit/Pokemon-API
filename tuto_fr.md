 - Endpoint Express = app.METHODE(CHEMIN,GESTIONNAIRE(req,res)) ex: app.get('/api/pokemons/1', (req,res) => res.send('Hello amis bulbizarre'));

- Objet req.params.id permet de recupere un paramètre de l'URL ex: 

app.get('/api/pokemons/:id', (req,res) => {                                                    app.get('/api/pokemons/:id/:name', (req,res) => {
const id = req.params.id;                               OU                                     const id = req.params.id;
res.send('Hello amis bulbizarre')});                                                           const name = req.params.name;
                                                                                               res.send(`Le pokemon numéro ${id} est ${name}`)});

- ATTENTION req.params récupère le paramètre sous forme de chaine de caractère !!!

Ex :                    app.get('/api/pokemons/:id', (req,res) => {
                        const id = req.params.id;
                        const pokemon = pokemons.find(pokemon => pokemon.id === id)   <-------- ICI ont compare donc un integer avec une string
                        res.send(`Vous avez demandé le pokémon ${pokemon.name}`)});

Solution : Ont utilise la méthode parseInt

- Exportation de module , module.export = [mon tableau ] ou {mon objet}
  importation de module, maVariable = require('./mon chemin')