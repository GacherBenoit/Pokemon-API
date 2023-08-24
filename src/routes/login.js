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
            .then(user => {
                bcrypt.compare(req.body.password, user.password) // compare is a bcrypt method and checks password send by client to password in DB
                .then(isPasswordValid => { 
                    if(isPasswordValid) {
                        const message = `L'utilisateur à été connecté avec succès`;
                        return res.json({message, data: user})
                    }
                })
            })
    })
}