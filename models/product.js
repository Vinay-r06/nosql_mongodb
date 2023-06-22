//const mongoConnect=require('../util/database')
const getDb=require('../util/database').getDb;

class Product {
constructor(title, price, description, imageUrl){
  this.title=title;
  this.price=price;
  this.description=description;
  this.imageUrl=imageUrl;
}
save(){                                      // we had database , collections, documents
  const db =getDb();                         // this database
 return db.collection('products')                           // collections...if connect to any collection....if doesnt exit..it will create when insert data..
    .insertOne(this)                                           // so here i will connect to a products collection..
    .then(result=>{                                       // insertOne()-> 1 object ....insertMany()->multiple..takes array of js object
    console.log(result);
    })
    .catch(err=>{
    console.log(err);
    }) 
    }                                          // object means vaild code ..insert in such document into database..
                                               // {name:..., price: ..}  this not json..this is javascrpit object..but mongodb will convert..
}



module.exports = Product;
