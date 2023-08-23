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
            allowNull: false
        },
        hp: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg :' Utilisez uniquement des nombres entiers pour les points de vie'}, // Sequelize validators
                notNull: { msg:'Les points de vie sont une propriété require'}      
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',')  //Now we get from BD types property with word split by coma in a array
            },
            set(types) {
                this.setDataValue('types', types.join())  // Now types property is set into a string to send in DB
            }
        }
    },  
    {
        timeStamps:true,                  // 3- Facultative parameter of define's method , the global parameters to configure the model
        createdAt: 'created',             // By default sequelize will automacily create 2 properties for every models : createrdAt and updatedAt
        updateAt: false                   // Sequelize is flexible and authorize to configure this parameters.
    })
}