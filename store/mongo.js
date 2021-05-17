
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
    let connection= new Promise((resolve,reject)=>{
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

async function list(collection, tags){
    
    return new Promise ((resolve, reject)=>{
        output= connect().then(db=>{            
            return db
            .collection(collection)
            .find({})
            .toArray()
        })
        resolve(output)
    })
}


module.exports = {
    list,
};



