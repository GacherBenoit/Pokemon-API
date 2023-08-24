// Import User model
const { User } = require('../db/sequelize');
// Import Bcrypt
const bcrypt= require('bcrypt');

module.exports = (app) => {
    app.post('/api/login', (req,res) => {

            User.findOne({
                where: {
                    username: req.body.username
                }
            })
            .then(user => {    // In first we check if users exist with username send by client
                if(!user) {    // If usernamme dont exist we return a error message with 404 code status
                    const message= `L'utilisateur demandé est incorrect.`
                    return res.status(404).json({message})
                }                                                // In second step we check the password send by client
                bcrypt.compare(req.body.password, user.password) // compare is a bcrypt method who return a promise and checks password send by client to password in DB
                .then(isPasswordValid => { 
                    if(!isPasswordValid) {                       // If password is invalid we return a error message with 401 code status
                        const message = `Le mot de passe est invalide`;
                        return res.status(401).json({message})
                    }
                    const message = `L'utilisateur est connecté'`; // If the username and password pass the two previous conditions, we send the success message with the data
                    return res.json({message, data: user})
                })
               
            })
            .catch(error => {
                const message = `L'utilisateur n'est pas connecté'.Réessayez dans quelques instants.` // We manage the generic error in case of a network call that fails
                res.status(400).json({message, data: error}) 
            }) 
    })
}