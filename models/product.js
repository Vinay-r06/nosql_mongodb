const mongodb=require('mongodb');

//const mongoConnect=require('../util/database')
const getDb=require('../util/database').getDb;

class Product {
constructor(title,imageUrl, price, description,id){
  this.title=title;
  this.imageUrl=imageUrl;
  this.price=price;
  this.description=description;
 
  this._id=id ? new mongodb.ObjectId(id) : null;                // now this will objectid
}
save(){ 
                                       // we had database , collections, documents
  const db =getDb(); 
  let dbOp;                            
  if(this._id){
    //update the product
    dbOp=db.collection('products')
            .updateOne({_id:this._id}, {$set: this});
  }else{
    dbOp=db.collection('products').insertOne(this);
  }
                                                            // this database
 return dbOp                                     // collections...if connect to any collection....if doesnt exit..it will create when insert data..
                                                          // so here i will connect to a products collection..
    .then(result=>{                                       // insertOne()-> 1 object ....insertMany()->multiple..takes array of js object
    console.log(result);
    })
    .catch(err=>{
    console.log(err);
    }) 
    }                                          // object means vaild code ..insert in such document into database..
                                               // {name:..., price: ..}  this not json..this is javascrpit object..but mongodb will convert..

static fetchAll(){
  const db =getDb(); 
  return db.collection('products').find()        // find returns cursor..cursor is an object provided by mongodb..which allows go through our elemnts, our doucuments step by step...
  .toArray() 
  .then(products=>{
    console.log(products);
    return products;
  })
  .catch(err=>{
    console.log(err);
  });
}                                               // find - gives millions of documents....there is = toArray method to tell mongodb to get all documents and turn them into  a javascript array..
 
static findById(prodId){
  const db= getDb();
  return db.collection('products').find({_id: new mongodb.ObjectId(prodId)}).next()      // in mongodb id will be objectId in string format all special charaters is there so import mongodb and access objectid to access id..       // since find - will give cursor..moongodb will not know i am accessing 1 product..so i will put "next"
  .then(product =>{
    console.log(product);
    return product;
  })
  .catch(err=>{
    console.log(err)
  })
}

static deleteById(prodId){
  const db= getDb();
  return db.collection('products').deleteOne({_id:new mongodb.ObjectId(prodId)})
.then(result=>{
  console.log('Deleted');
})
.catch(err=>{
  console.log(err)
})
}

  }



module.exports = Product;
