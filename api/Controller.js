const Datastore = require('nedb');

const database = new Datastore({
    filename: ("./api/database.db"),
    autoload: true,
})

const replit = true;
 async function persist(){replit?await require("./ReplPersist.js")(['./api/database.db']):null}

 //PERSIST EVERY 10MIN
setInterval(async()=>await persist(), 10*60*1000)

module.exports = {
   
    db: {
        async get(query) {
            const res = await _database(query)
            //await persist()
            return res
        },
        async getOnly(query, len) {
            const res = await _database_only(query,len)
            //await persist()
            return res
        },
        async getOne(query) {
            const res = await _database_one(query)
            //await persist()
            return res
        },
        async insert(question) {
            const res = await _insert_database(question)
            await persist()
            return res
        },
        async update(query, updateQuery) {
            const res = await _update_database(query, updateQuery)
            await persist()
            return res
        },
        async remove(query) {
            const res = await _remove_database(query)
            await persist()
            return res
        },
    } 
}
// NEDB
async function _database(query) {
    return await new Promise(async (resolve, reject) => {
        database.loadDatabase()
        database.find(query || {}, function (err, docs) {
            if (err) resolve({});
            resolve(docs);
        })
    })
}
async function _database_only(query, len){
    return await new Promise(async (resolve,reject)=>{
        database.loadDatabase()
        database.find(query)
        .limit(len).exec(function (err, docs) {
            if (err) resolve(null);
            resolve(docs);
        });
    })
}
async function _database_one(query) {
    return await new Promise(async (resolve, reject) => {
        database.loadDatabase()
        database.findOne(query || {}, function (err, docs) {
            if (err) resolve(null);
            resolve(docs);
        })
    })
}
async function _update_database(query, updateQuery) {
    return await new Promise(async(resolve, reject) => {
        database.loadDatabase()
        database.update(query, updateQuery, { upsert: true, multi: true }, function (err, nou, us) {
            //if(err) throw new Error(err)
            resolve(nou>0)
        })
    })
}
async function _insert_database(usuario) {
    return await new Promise(async (resolve, reject) => {
        database.loadDatabase()
        database.insert(usuario, function (err, doc) {
            err ? resolve(false) : resolve(doc)
        })
    })
}
async function _remove_database(usuario) {
    return await new Promise(async (resolve, reject) => {
        database.loadDatabase()
        database.remove(usuario, function (err, nr) {
            resolve(!err)
        })
    })
}


//MONGODB ATLAS
/* 
const db = require('./models/database')
async function _database(query) {
    return await new Promise(async (resolve, reject) => {
        const response = await ((await db()).collection("database").find(query||{})).toArray()
        resolve(response)
        
    })
}
async function _database_one(query) {
    return await new Promise(async (resolve, reject) => {
        const response = await ((await db()).collection("database").findOne(query||{}))
        return resolve(response)
        
    })
}
async function _update_database(query, updateQuery) {
    return await new Promise(async(resolve, reject) => {
        return ((await db()).collection("database").updateMany(query, updateQuery, (er,re)=>{
            resolve(!er)
        }))
        
    })
}
async function _insert_database(usuario) {
    return await new Promise(async (resolve, reject) => {
        return ((await db()).collection("database").insertOne(query, (er,re)=>{
            er?resolve(false):resolve(re)
        }))
        
    })
}
async function _usersdb(query) {
    return await new Promise(async(resolve, reject) => {
        const response = await ((await db()).collection("dbApp").find(query||{})).toArray()
        return resolve(response)
        
    })
}
async function _usersdb_one(query) {
    return await new Promise(async (resolve, reject) => {
        const response = await ((await db()).collection("dbApp").findOne(query||{}))
        return resolve(response)
       
    })
}
async function _update_usersdb(query, updateQuery) {
    return await new Promise(async(resolve, reject) => {
        return ((await db()).collection("dbApp").updateMany(query, updateQuery, (er,re)=>{
            resolve(!er)
        }))
        
    })
}
async function _insert_usersdb(usuario) {
    return await new Promise(async (resolve, reject) => {
        return ((await db()).collection("dbApp").insertOne(query, (er,re)=>{
            er?resolve(false):resolve(re)
        }))
        
    })
}
async function _couponsdb(query) {
    return await new Promise(async(resolve, reject) => {
        const response = await ((await db()).collection("dbApp").find(query||{})).toArray()
        return resolve(response)
        
    })
}
async function _couponsdb_one(query) {
    return await new Promise(async(resolve, reject) => {
        const response = await ((await db()).collection("dbApp").findOne(query||{}))
        return resolve(response)
        
    })
}
async function _update_couponsdb(query, updateQuery) {
    return await new Promise(async(resolve, reject) => {
        return ((await db()).collection("coupons").updateMany(query, updateQuery, (er,re)=>{
            resolve(!er)
        }))
        
    })
}
async function _insert_couponsdb(usuario) {
    return await new Promise(async (resolve, reject) => {
        return ((await db()).collection("coupons").insertOne(query, (er,re)=>{
            er?resolve(false):resolve(re)
        }))
        
    })
}
async function _remove_couponsdb(query) {
    return await new Promise(async(resolve, reject) => {
        return ((await db()).collection("coupons").deleteMany(query, (er,re)=>{
            er?resolve(false):resolve(re)
        }))
        
    })
}

async function _insert_topaydb(usuario) {
    return await new Promise(async(resolve, reject) => {
        return ((await db()).collection("topay").insertOne(query, (er,re)=>{
            er?resolve(false):resolve(re)
        }))
        
    })
}
async function _update_topaydb(query, updateQuery) {
    return await new Promise(async(resolve, reject) => {
        return ((await db()).collection("topay").updateMany(query, updateQuery, (er,re)=>{
            resolve(!er)
        }))
        
    })
}
*/