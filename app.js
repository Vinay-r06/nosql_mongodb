const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
// const sequelize = require('./util/database');
// const Product = require('./models/product');
// const User = require('./models/user');
// const Cart = require('./models/cart');
// const CartItem = require('./models/cart-item');
// const Order = require('./models/order');
// const OrderItem = require('./models/order-item');

const mongoConnect=require('./util/database').mongoConnect;          //which will be function because expoerted function their
const User = require('./models/user');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('649586d8736b1ee8cb4af127')
    .then(user => {
      req.user = user;
      next();
    //  console.log(req.user)
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
 app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(()=>{
 // console.log(client);                  // since we dont had callback client so removed..
app.listen(3000)
})

