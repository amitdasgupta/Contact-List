const port = 8000;
const express = require("express");

////this is added to make res.render to work//
const path = require("path");


const db =require('./config/mongoose');
const Contact=require('./models/contact');

const app = express();

// var contactList = [
//   {
//     name: "Amit",
//     phone: "1234567890"
//   },
//   {
//     name: "Tony",
//     phone: "1254567890"
//   },
//   {
//     name: "Superman",
//     phone: "123453890"
//   },
//   {
//     name: "Batman",
//     phone: "1235567890"
//   }
// ];

// this sets view engine for current app
app.set("view engine", "ejs");

// this set current view for app
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded());

app.use(express.static('assets'));

// // middleware1

// app.use(function(req,res,next){
//   req.myName='Amit';
//   console.log('calling from mw1');
//   next();
// });

// // middleware2

// app.use(function(req,res,next){
//   console.log('calling from mw2',req.myName);
//   next();
// });

app.get("/", function(req, res) {
  Contact.find({},function(err,contact){
    if(err)
    {
      console.log('error fetching data')
      return;
    }
    return res.render("home", 
             { title: "Contact List",
             contact_list:contact 
             });
    });
});

app.get("/practice", function(req, res) {
  return res.render("practice", { title: "doing practice work here" });
});


// this method is used here to get form data from home.ejs and then add here
app.post('/create-contact',function(req,res){
  // console.log('calling from create contact:',req.myName);
  // contactList.push(req.body);
  // return res.redirect('back');
     Contact.create({
       name:req.body.name,
       phone:req.body.phone
     },function(err,newContact){
         if(err)
         {
           console.log('error in creating contact');
           return;
         }
         console.log('***************',newContact);
         return res.redirect('back');
     });
});


// this method is used to delete a item
// here we can use either query or param i have used query here
app.get('/delete-contact',function(req,res){
  // get the id from query in the ul
    let id=req.query.id;
    
    // find the contact in database using id and delete
    Contact.findOneAndDelete(id,function(err){
      if(err){
       console.log('unable to delete document');
       return;
      }
      return res.redirect('back');
    });
});

app.listen(port, function(err) {
  if (err) {
    console.log("error occured");
    return;
  }
  console.log("Server running at port:", port);
});
