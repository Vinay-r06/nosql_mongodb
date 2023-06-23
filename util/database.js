// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('node-complete', 'root', 'nodecomplete', {
//   dialect: 'mysql',
//   host: 'localhost'
// });

// module.exports = sequelize;

const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient;    // we can extract a mongo client constructor by simply accessing mongodb..

let _db;

const mongoConnect=(callback)=>{                        // created method to export
MongoClient.connect('mongodb+srv://vinay:0yHLfujsfodVnGNN@cluster0.clymc3w.mongodb.net/shop?retryWrites=true&w=majority')
           .then(client=>{
            console.log('Connected');
            _db= client.db()
            callback();                 // will call back once connected                     
           })
           .catch(err=>{
            console.log(err);
            throw err;
           })

          };

const getDb=()=>{
    if(_db){
        return _db;                               // return access to my database..
    }
    throw 'no database found';
}

//module.exports= mongoConnect;
                                               // 2 methods --1 for connecting and then storing the connection to the database..this will keep on running and i have 1 method where i return access to that conected database if exits..
exports.mongoConnect= mongoConnect;
exports.getDb= getDb;


// connection pooling: where mongodb will make sure it provides sufficient  connections for multiple simultaneous interactions with the database...





//exporting function 

// in sql we want to prepare advance to create database..but in nosqlthe collection in there ahead..
//it will create as soon as data writing data to it.. 