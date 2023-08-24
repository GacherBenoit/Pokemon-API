 - Endpoint Express = app.METHODE(CHEMIN,GESTIONNAIRE(req,res)) ex: app.get('/api/pokemons/1', (req,res) => res.send('Hello amis bulbizarre'));


/* app.get('/',(req,res) => res.send('Hello,Express! ')) // Définition d'un endpoint avec la méthode GET

En premier paramètre ont spécifie l'URL , puis en deuxième nous avons les objets suivant :
-req : L'objet request qui correspond a la requête reçue par le endpoint 
-res : Response , l'objet envoyé au client

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


                                                                  //// CREER UN MODEL (user)  ///////

Je crée mon fichier user.js dans mons dossier model: 

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            unique: {    // Contrainte d'unicité                   
                msg: 'Le nom est déja pris.'
            }
        },
        password: {
            type: DataTypes.STRING
        }
    })
}

  J'importe mon model dans le fichier de Sequelize :   const UserModel = require('../models/user');
  Et je configure la connection a ma DB :

  const sequelize = new Sequelize (
    'pokedex',  // DB name
    'root',  // userName of database (root by default on mariadb)
    '', // password of Database
    {
        host : 'localhost', // host
        dialect:'mariadb', // Driver use for sequelize
        dialectOptions : {
            timezone: 'Etc/GMT-2'
        },
        logging: false
    }
)
const User = UserModel(sequelize, DataTypes);        // Create an instance of user model to create our table in db

Si neccessaire de remplir l'entité crée ont peut ensuite ajouter du contenus :

const initDb = () => {
    sequelize.sync({force:true})  // !!!! this option delete the table associate to every models , we lost data of table at every restart. Its ok for the de momment to work with fresh entity.
    .then(_ => {  
        User.create({
            username:'pikachu',
            password:'pikachu'
        })
        .then(user => console.log(user.toJSON()))
        
            console.log('la base de donné "Pokedex" a bien été synchronisée')  // synchronize our method with DB                                                      
            })
    }
module.exports = {
    initDb, User
}      



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

ATTENTION  !!!!!!

sequelize.sync({force:true}) 

Cette commande va recrée et donc écraser la table existante en base de donnée. C'est actuellement ok pour le développement
 mais a ne surtout pas oublier lorsque l'ont souhaite travailler en conservant les data de la BDD.



                                                    //// GETTER /// SETTER ////

Nous avons du paramétrer les getters et setters pour la propriété 'types' du model Pokememon:

// Getter : Base de données -> API Rest
"Plante, Poisson".split(',') // ["Plante","Poison"]

// Setter : API Rest -> Base de données
["Plante","Poison"].join()  // "Plante,poison"



                                                    /// STAUTS HTTP  ////

CODE 1XX : L'information
CODE 2xx: Le succès
CODE 3xx: La redirection
CODE 4xx: Erreur du client 
CODE 5xx: Erreur du serveur


                                                    //// VALIDATEURS /////

Les validateurs vont nous permettre de mettre de véritable règles de validations des données fournit par Sequelize.
Les messages d'erreur seront donc affinés lorsque l'ont voudra ajouter ou modifié des données en DB.


exemple dans notre models de l'entité Pokemon :


    hp: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg :' Utilisez uniquement des nombres entiers pour les points de vie'}, // Sequelize validators
                notNull: { msg:'Les points de vie sont une propriété require'}      
            }
        },

Ont met en place des messages personnalisé au cas ou ont recoit une décimal plutot qu'un entier et au cas ou ont ne recoit rien pour la propriété des points de vie.

                                                   
Dans noter route oncernant la création d'un pokémon : 

  .catch(error => {
            if(error instanceof ValidationError) {
                return res.status(400).json({message: error.message, data: error})  
            })
    
Si Sequelize renvoie une erreur de validation , nous envoyons une erreur 400 ainsi que le message d'erreur définis dans le validateur ( data: error )



                                                ////   QUERRY PARAMS ///


Ce sont des paramètres que l'ont ajoute à nos endpoint pour faire plus de requêtes


exemple pour récupéré uniquement les pokémons avec un nom donnée:

- monsite.com/api/pokemon?name="Bulbizzare"

Comment choisir qu'elle est le mieux , querry params (paramètre de requêtes) ou definir un paramètre d'url ?

Les paramètres d'url doivent etre identifié pour identifié une ressource spécifique. ('api/pokemon/:id')
Les paramètre de erqupetes pour trier ou filtrer des ressources.('api/pokemon?name="Pikachu")


                                            /// OPERATEUR SEQUELIZE ///


Si ont veut permettre au client une recherche de pokémon par nom , en utilisant le endpoint de la méthode findAll,
ont peut utiliser un paramètre de requête comme suit :


app.get('/api/pokemons',(req,res) =>{                              
      if(req.query.name) {     
        console.log(req.query.name)                                        
        const name = req.query.name;
        return Pokemon.findAll({
           where: {                                                                                                              
               name : name                                              
             }
          })                    
        .then(pokemons => {
          const message = `Il y a ${pokemons.length} pokémons qui correspondent au terme de recherche ${name}.`
          res.json({ message, data: pokemons })
        })

Le problème est que lors de la recherche , ont ne renverra au client le résultat qui correspondra strictement au nom.
Pour pallier à ce problème, Sequelize met a notre disposition des opérateurs comme suit, l'opérateur like: 


    app.get('/api/pokemons',(req,res) =>{                                  
      if(req.query.name) {     
        console.log(req.query.name)                                         
        const name = req.query.name;
        return Pokemon.findAll({
           where: {                                                         
             name: {                                                        
               [Op.like]: `%${name}%`     // ICI NOTRE OPERATEUR SEQUALIZE LIKE                                         
             }
            } 
          })            

Ainsi , Sequilize renverra une liste de résultat contrairement a un seul et unique résultat strict.


                                  ///AUTHENTIFICATION ///

Nous avons besoin d'un endpoint dédié a cette tache.
Il faut encrypter le MDP qui sera sauvegardé et sécurisé l'échange des données.
Nous devons fournir un identifiant unique et un mot de passe.

Pour crypter sous forme de Hash le MDP nous utiliserons bcrypt afin que ce dernier n'apparaisse pas en DB.

Ont passe donc de :           User.create({
                              username:'pikachu',
                              password:'pikachu'
                              })
                              .then(user => console.log(user.toJSON()))
 A:
                           
bcrypt.hash('pikachu',10)
        .then(hash => User.create({ username:'pikachu', password:hash}))
        .then(user => console.log(user.toJSON()))

La méthode hash prends 2 paramètres: 
-Le mot de passe ici en dur (pikachu)
-Le salt Rounds qui est le temps necessaire pour hacher correctement de mdp