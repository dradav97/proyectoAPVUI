const db = {
    'user': [
        { id: '1', name: 'Carlos' },
    ],
};
// aqui creamos las funciones asincronas
async function list (tabla) {
    return db[tabla] || []
}
async function get (tabla, id) {
    let col = await list(tabla)
    return col.filter(item=> item.id == id)[0] || null
}
async function upsert (tabla, data) {
    if (!db[tabla]) {
        db[tabla] = [];
    }

    db[tabla].push(data);

    console.log(db)
}
async function remove (tabla, id) {
    let col = await list(tabla)    
    const index= col.indexOf(col.filter(item=> item.id == id)[0])
    col.splice(index,1)
    return `User with the id:${col[index].id} deleted`
    /*
    segunda forma de eliminar de un arreglo, supuestamente mas rapido
    aun no comprobado 
    col[index]= array[col.length - 1]
    col.pop()    
    return col.filter(item=> item.id == id)[0]*/
}

async function query(tabla, q) {
    let col = await list(tabla)
    let keys = Object.keys(q)
    let key = keys[0]
    
    return col.filter(item => item[keys[0]] === q[keys[0]])[0] || null
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query
}