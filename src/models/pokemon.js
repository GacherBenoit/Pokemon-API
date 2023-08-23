//We define a valid types array for Types properties and check it in custom validator
const validTypes= ['Plante','Poison','Feu','Eau','Insecte','Vol','Normal','Electrik','Fée','Souris','Oiseau'];

// We export function with two parameters
// Sequelize , it's a object with define properties to declare a new model
// Datatype to define the type of data for every properties of the model 
// define propertie is important and have 3 parameters :

module.exports = (sequelize, DataTypes) => {   
    return sequelize.define('Pokemon' , {      // 1- Name of the model , here 'Pokemon'. Sequelize will create the table Pokemon and add a 's' to make the Pokemons entity
        id: {                                  // 2- Description of the model with all properties, all properties will be traduce in columns in our table Pokemons
            type: DataTypes.INTEGER,          // For every properties, we define the Datatype and the others essentials attribute( primary key for id , allowNull ....)
            primaryKey: true,                  
            autoIncrement: true                
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg : 'Le nom de votre pokémon ne peut pas etre vide '}, // If client send a empty string,validators don't reconize input like null
                notNull: { msg : 'Merci de fournir un nom à votre pokémon.' },
                len: {
                    args:[1,25],
                    msg: 'Le nom de votre pokémon doit être une chaîne de caractère de minimum 1 caractère et au maximum 25 caractères'
                },
            }
        },
        hp: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg : 'Utilisez uniquement des nombres entiers pour les points de vie' }, // Sequelize validators
                min: {
                    args: [1],
                    msg: 'Le nombre de point de vie doit etre compris entre 1 et 999.' 
                },
                max: {                                                                             // Validator for number a characters min and max
                    args: [999],
                    msg: 'Le nombre de point de vie doit etre compris entre 1 et 999.'
                },
                notNull: { msg : 'Les points de vie sont une propriété requise' },
              
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg : `Utilisez uniquement des nombres entiers pour les points d'attaque` }, // Sequelize validators
                notNull: { msg : `Les points d'attaque sont une propriété requise` }, 
                min: {
                    args: [0],
                    msg: `Les points d'attaque doivent être supérieurs ou égale à 0.`
                },
                max: {                                                                             // Validator for number a characters min and max
                    args: [99],
                    msg: `Les points d'attaque  de vie doit etre compris entre 0 et 99.`
                }     
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: { msg : `Utilisez uniquement une Url valide pour l'image` }, // Sequelize validators
                notNull: { msg : `L'image' est requise` }      
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',')  //Now we get from BD types property with word split by coma in a array
            },
            set(types) {
                this.setDataValue('types', types.join())  // Now types property is set into a string to send in DB
            },

             // We make a custom validator
             // Make a function call isTypesValid or customValidator ,as you wish
             // Value parameters who correspond of the types value in DB whithout take into account setters and getters
             // Sequelize transmits to validator bully value , without treatment of setters and getters
             // So, thath's why we use again split method 

            validate: {                                   
                isTypesValid(value) {                     
                    if(!value) {                                                                                 
                        throw new Error('Un pokemon ne peux pas avoir plus de trois types')
                    }
                    if(value.split(',').length > 3) {
                        throw new Error('Un pokemon ne peux pas avoir plus de trois types') // Sequelize can return to client custom message
                    }
                    value.split(',').forEach(type => {
                        if (!validTypes.includes(type)) {  // If value don't correspond of some value define in validTypes array we return an error
                            throw new Error(`Le type de pokémon doit appartenir à la liste suivante : ${validTypes}`);
                        }                                                                        
                    });
                    
                }
            }
        }
    },  
    {
        timeStamps:true,                  // 3- Facultative parameter of define's method , the global parameters to configure the model
        createdAt: 'created',             // By default sequelize will automacily create 2 properties for every models : createrdAt and updatedAt
        updateAt: false                   // Sequelize is flexible and authorize to configure this parameters.
    })
}