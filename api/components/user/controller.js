const nanoid = require('nanoid');
const TABLA = 'user'


module.exports= function (injectedStore) {
    let store = injectedStore
    if(!store){
        store = require('../../../store/dummy')
    }
    function list(){
        return store.list(TABLA)
    }

    function get(id){
        return store.get(TABLA,id)
    }

    function upsert(body){
        let user = {            
            name: body.name,
            id: body.id ?? nanoid()
            // esto es como decir body.id ? body.id : nanoid()
        }
        
        return store.upsert(TABLA,user)
    }

    function remove(id){
        store.remove(TABLA, id)
    }
    return {
        list,
        get,
        upsert,
        remove,
    }
}