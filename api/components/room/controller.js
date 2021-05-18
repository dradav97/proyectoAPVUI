const TABLA = 'room';
/**
 * This module have all functions to manage the module room
 * how operations that  rooms CRUD 
 * 
 * the structure of room is:
 * {
 *    "name": "nameRoom"
    * "users": [{
    *      "$ref" : "user",
    *      "$id"  :  objectId('_idUser')       
    * }]
 * }
 * 
 * 
 * @param {Module} injectedStore 
 * @returns module 
 */

module.exports = function (injectedStore) {
    let store = injectedStore
    if(!store){
        store = require('../../../store/mongo');
    }

    async function list(){
        return await store.list(TABLA)
    }

    function get(id){
        return store.get(TABLA,id)
    }


    // body is username that create the room and room name
    async function upsert(body){
        let idUser= store.queryName_id("user",body.userName)
        const room = {
            name: body.name,
            users: [{
                $ref: "user",
                $id: idUser                                
            }]
        }
        return store.upsert(TABLA,room)
    }

    function update(id, data){
        return store.update(TABLA,id,data)
    }

    function remove(id){
        return store.remove(TABLA,id)
    }


    return {
        list,
        get,
        upsert,
        remove,
        update
    }
}