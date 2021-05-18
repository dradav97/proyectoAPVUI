const auth = require('../auth')
const TABLA = 'user';
/**
 * This module have all functions to manage the module room
 * how operations that  rooms CRUD 
 * 
 * the structure of room is:
 * {
 *    "_id": "id",
 *    "name": "",
 *    "last_name": "",
 *     "password": ""
 * 
    * 
 * }
 * 
 * 
 * @param {Module} injectedStore 
 * @returns module 
 */

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/mongo');
    }

    async function list() {
        return await store.list(TABLA);
    }

    function get(id) {        
        return store.get(TABLA, id);
    }

    async function upsert(body) {
        const user = {
            name: body.name,
            username: body.username,
        }

        

        if (body.password || body.username) {
            await auth.upsert({
                _id: user._id,
                username: user.username,
                password: body.password,
            })
        }

        return store.upsert(TABLA, user);
    }

    function remove(id) {        
        return store.remove(TABLA, id);
    }
    function update(id,data) {        
        return store.update(TABLA, id,data);
    }



    return {
        list,
        get,
        upsert,
        remove,
        update
    };
}