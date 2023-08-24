const jwt = require('jsonwebtoken');
const privateKey = require('./private_key')

module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization // We get HTTP Header, the JWT send by client will transit inside
    if(!authorizationHeader) {      // We check if the JWT is provided
        const message = `Vous n'avez pas fourni de jeton d'authentification valide.Ajoutez-en un dans l'en-tête de la requête.`
        return res.status(401).json({message})
    }

    const token = authorizationHeader.split(' ')[1] // We get token without Bearer designation (we get authorization: Bearer <JWT>)
    const decodedToken = jwt.verify(token,privateKey, (error, decodedToken) => { // We check the token's validity with verify method
        if(error) {
            const message = `L'utilisateur n'est pas authorisé à accéder à cette ressource.`
            return res.status(401).json({ message, data: error})
        }

        const userId= decodedToken.userId
        if (req.body.userId && req.body.userId !== userId) {
            const message = `L'authentifiant de l'utilisateur est invalide.`
            res.status(401).json({message})
        } else {
            next() // We let user acess to the endpoint with next method
        }
    }) 
}