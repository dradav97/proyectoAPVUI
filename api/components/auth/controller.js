const auth = require('./../../../auth')
const bcrypt = require('bcrypt')
const TABLA = 'auth'

module.exports= function (injectedStore) {
    let store = injectedStore
    if(!store){
        store = require('../../../store/dummy')
    }
    
    async function login(username, password){
        const data= await store.query(TABLA, {username : username})
        // bcrypt.compare() return a promisse but we use then to return the token
        return bcrypt.compare(password,data.password)
            .then(soniguales=>{
                if (soniguales===true) {
                    //generate token
                    return auth.sign(data)
                }else{
                    throw new Error('Informacion invalida')
                }                
            })        
        
    }
    // this for when we add a new user
    async function upsert(data){
        const authData = {
            id: data.id,
        }
        if (data.username) {
            authData.username = data.username
        }
        if (data.password) {
            // bcrypt.hash(data, number of times to run the algoritm ) more times is more slow
            authData.password = await bcrypt.hash(data.password,5)      
        }
        // add authData to tabla auth
        return store.upsert(TABLA, authData)
    }

    return {
        upsert,
        login,
    }
}