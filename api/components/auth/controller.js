const auth = require('./../../../auth')
const bcrypt = require('bcrypt')
const { json } = require('express')
const TABLA = 'auth'

module.exports= function (injectedStore) {
    let store = injectedStore
    if(!store){
        store = require('../../../store/mongo')
    }
    
    async function login(username, password){
        
        const data= await store.query(TABLA,username)
        // bcrypt.compare() return a promisse but we use then to return the token
        //console.log(data[0].password)
        return bcrypt.compare(password,data[0].password)
            .then(ifEquals=>{               
    
                if (ifEquals) {
                    //generate token
                    
                    return auth.sign({ ...data[0]})
                }else{
                    throw new Error('Informacion invalida')
                }                
            })        
        
    }
    // this for when we add a new user
    async function upsert(data){
        const authData = {
        
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