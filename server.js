const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const db =  require('./models');
var bcrypt = require ('bcryptjs');
const {ObjectId} = require ('mongodb');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join (__dirname, 'client')));
app.use(express.static(path.join (__dirname, 'uploads')));
var mongoClient = process.env.DB_URI;

const Role = db.role;
const User = db.user;
//route files

require('./routes/auth.routes')(app);
require('./routes/foods.routes')(app);
require('./routes/order.routes')(app);
require('./routes/feedback.routes')(app);
db.mongoose
  .connect (mongoClient, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then (() => {
    // console.log(client);
    // nativeDB = client;
    // console.log("Native DB : ",nativeDB);
    console.log (
      'Successfully connected to MongoDB. MONGO_CLIENT : ' + mongoClient
    );
    // logger.info(`Successfully connected to MongoDB. MONGO_CLIENT: ${mongoClient}`)
    initial ();
  })
  .catch (err => {
    console.error ('Connection error', err);
    process.exit ();
  });


 async function initial(){
      //adding default data
    try{
      const roleCount = await Role.estimatedDocumentCount();
      // console.log(roleCount);
         if (roleCount === 0) {

      const usersRole = await new Role ({
        _id: new ObjectId ('611a9cb1e3fca62b2401e4be'),
        name: 'user',
      }).save ();

      // console.log(usersRole);
      const adminRole = await new Role ({
        _id: new ObjectId ('611a9cb1e3fca62b2401e4bf'),
        name: 'admin',
      }).save ();
      console.log(adminRole);
    }

    const userCount = await User.estimatedDocumentCount ();
       if (userCount === 0) {
      const testUser = await new User ({
        fname:'Test',
        lname:'User',
        username: 'testuser',
        email: 'testuser@gmail.com',
        password: bcrypt.hashSync ('123123', 8),
        roles: [new ObjectId ('611a9cb1e3fca62b2401e4be')],
      }).save ();
      console.log(testUser);

      const testadmin = await new User ({
        fname:'Test',
        lname:'Admin',
        username: 'testadmin',
        email: 'testadmin@gmail.com',
        password: bcrypt.hashSync ('123123', 8),
        roles: [new ObjectId ('611a9cb1e3fca62b2401e4bf')],
      }).save ();
      console.log(testadmin);
      }
    }catch(err){
      console.log(err);
    }
 

  // User.estimatedDocumentCount ((err, count) => {
  //   if (!err && count === 0) {
  //     new User ({
  //       username: 'testuser',
  //       email: 'testuser@gmail.com',
  //       password: bcrypt.hashSync ('123123', 8),
  //       isDisabled: false,
  //       roles: [ObjectId ('611a9cb1e3fca62b2401e4be')],
  //     }).save (err => {
  //       if (err) {
  //         console.log ('error', err);
  //       }

  //       console.log ("added 'user' to users collection");
  //     });
  //     new User ({
  //       username: 'testadmin',
  //       email: 'testadmin@gmail.com',
  //       password: bcrypt.hashSync ('123123', 8),
  //       isDisabled: false,
  //       roles: [ObjectId ('611a9cb1e3fca62b2401e4bf')],
  //     }).save (err => {
  //       if (err) {
  //         console.log ('error', err);
  //       }

  //       console.log ("added 'admin' to user collection");
  //     });

   
  //   }
  // });


  }





//returning all other request to frontend app
app.get ('*', function (req, res) {
    res.sendFile (path.join (__dirname, 'client', 'index.html'));
  });
  

app.listen(PORT,()=>{
    console.log(`Server listening at PORT ${PORT}`)
})