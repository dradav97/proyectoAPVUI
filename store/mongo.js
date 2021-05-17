
const { MongoClient, ObjectId } =require('mongodb')
const config = require('./../config')

//MongoDB URI
// mongodb+srv://DB_USER:DB_PASSWORD@DB_HOST/BD_NAME
const USER= encodeURIComponent(config.mongo.dbUser)
const PASSWORD = encodeURIComponent(config.mongo.dbPassword)
const DB_NAME = config.mongo.dbName

const MONGO_URI  = `mongodb+srv://${USER}:${PASSWORD}@${config.mongo.dbHost}/${DB_NAME}?retryWrites=true`

const connectionParams = {
    useNewUrlParser: true,    
    useUnifiedTopology: true,
    writeConcern:{
        w: "majority"
    }
}

function connect() {
    
    let client = new MongoClient(MONGO_URI, connectionParams);
    connection= new Promise((resolve,reject)=>{
        client.connect(err=>{
            if(err){                
                reject(err)                
            } else{
                console.log('DB Connected')
                resolve(client.db(DB_NAME))
            }
        })
    })
    return connection    
}

function list(collection){    
    return new Promise ((resolve, reject)=>{
        output= connect().then((db,err)=>{ 
            if (err) {reject(err)}           
            return (
                db
                .collection(collection)
                .find({})
                .toArray())
        })
        resolve(output)
    })
}

function get(collection,id){
    return new Promise ((resolve, reject)=>{
        output= connect().then((db,err)=>{ 
            if (err) {reject(err)}           
            return (
                db
                .collection(collection)
                .find({ _id: ObjectId(id) })
                .toArray())
        })
        
        resolve(output)
    })
}

function upsert(collection, data){
    return new Promise ((resolve, reject)=>{
        output= connect().then((db,err)=>{ 
            if (err) {reject(err)}           
            return (
                db
                .collection(collection)
                .insertOne(data))
        })
        
        resolve(output.insertedId)
    })
}

function update(collection,id, data){
    return new Promise ((resolve, reject)=>{
        output= connect().then((db,err)=>{ 
            if (err) {reject(err)}           
            return (
                db
                .collection(collection)
                .updateOne({ _id:ObjectId(id) },{ $set: data }, { upsert: true}))
        })        
        resolve(output.upsertedId || id)
    })
}

function remove(collection,id){
    return new Promise ((resolve, reject)=>{
        output= connect().then((db,err)=>{ 
            if (err) {reject(err)}           
            return (
                db
                .collection(collection)
                .deleteOne({ _id:ObjectId(id) }))
        })        
        resolve(output.upsertedId || id)
    })
}

function query(collection, username){
    return new Promise ((resolve, reject)=>{
        output= connect().then((db,err)=>{ 
            if (err) {reject(err)}           
            return (
                db
                .collection(collection)
                .find({username :username})
                .toArray())
        })
        
        resolve(output)
    })


}


module.exports = {
    list,
    get,
    upsert,
    update,
    remove,
    query
};



