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

-Format JSON : au lieu de res.send() ont envoie au format json avec res.json(mon objet)

ex:     app.get('/api/pokemons/:id', (req,res) => {
        const id = parseInt(req.params.id); 
        const pokemon = pokemons.find((pokemon)=> pokemon.id === id)
        res.json(pokemon)});

                                                                /////       MIDDLEWARE     /////

 L'ordre d'exécution des middlewares est important.Si ont a un middleware pour les logs et un autre pour les erreurs, il faut bien entendus activer les logs en premiers.
 Sinon ont ne logerais rien du tout. 
 Quand ont fait appel aux middlewares, il faut donc bien réfléchir à l'ordre,car cela peut impacter le fonctionnement de l'application.

                                                                  //// REQUETES HTTP  ///////

 Les données qui transitent via le protocole 'htpp' le font sous forme de chaine de caractère.
 Ont travaille dans notre App , au format JSON.
 Les données entrente doivent donc etre parsé pour les récupéré au format JSON.

 ex:

 // Chaine de caractères transitant par le protocole HTTP :
 const userString = '{"name":"John", "age": 33}'             ---------------------------->console.log(userString.age) // Affiche "undefined"


 // Format JSON:
 const userJSON = {"name":"John","age":33}                   ---------------------------->console.log(userJSON.age) // Affiche "33"


                                                                //// Requete PATCH vs PUT //////

Pour modifier seulement une partie d'une ressource , il existe une opération appellé PATCH.
Dans le cadre d'une API REST la méthode la plus fiable est la méthode PUT.
Imaginons que deux clients veulent modifier la même ressource... 
La méthode PUT va supprimer la ressource au complet pour la remplacer avec toute les nouvelles valeurs.

/////ORM SEQUELIZE ///

installer le driver pour mariaDB : npm install mariadb --save

Sequelize fonctionne en 2 étapes simples , en premiers ont déclare les modèle que l'ont veut utiliser.


ex: module.exports = (sequelize, DataTypes) => {   
    return sequelize.define('Pokemon' , {      
        id: {                                  
            types: DataTypes.INTEGER,          
            primaryKey: true,                  
            autoIncrement: true                
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }...


Ensuite il faut syncroniser les modèles avec la base de donnéee.Chaque modèle donnera donc une table en base de donné.
