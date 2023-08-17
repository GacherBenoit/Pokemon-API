exports.success = (message, data) => {                       // exports.success = (message, dat) => { 
    return {                                                 //  return (
        message,data                   //  IS LIKE           //  message:message
}                                                            //  data:data )
};                                                           // };

// Add unique Id method 

// Get a array of id
// Get the maximum id
// Return the max Id incremented to add it at every post request
exports.getUniqueId = (pokemons) => {                           
    const pokemonsIds = pokemons.map(pokemon => pokemon.id)
    const maxId= pokemonsIds.reduce((a,b) => Math.max(a,b))
    const uniqueId = maxId + 1
    return uniqueId
}
