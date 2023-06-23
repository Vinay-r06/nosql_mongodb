const mongodb=require('mongodb');
const getDb= require('../util/database').getDb;

const ObjectId=mongodb.ObjectId;
class User{
constructor(username, email){
  this.username=username;
  this.email=email;
}

save(){
  const db=getDb();
  return db.collection('users').insertOne(this);
}

static findById(userId){
  const db=getDb();
  return db.collection('users').findOne({_id: new ObjectId(userId) })                // find({_id: new ObjectId(userId)}).next();--> this will return cursor..we only return 1 element.....if u sure only one element then use "findOne()"--if use like this..it will not give "cursor"..but imediately it will return that 1 element...an alternative....find->next...findOne-> return 
  .then(user=>{
    console.log(user, 'user model');
    return user;
  })
  .catch(err=>{
    console.log(err);
  });
}
}


module.exports = User;