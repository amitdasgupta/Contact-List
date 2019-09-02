// require the library
const mongoose=require('mongoose');

// connect to database
mongoose.connect('mongodb://localhost/contacts_list_db');

// acquire the connection to check if it is successfull
const db=mongoose.connection;


// error
db.on('error',console.error.bind(console,'error connecting to db'));


// up and runnibg print the mesaage
db.once('open',function(){
   console.log('succesfully connected to database');
});