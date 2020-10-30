const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/danceweb', {useNewUrlParser: true, useUnifiedTopology: true});
const bodyparser= require("body-parser")


const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    gender: String,
    address: String,
    age: String
  
  });

  const contact= mongoose.model('contact', contactSchema);



// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory


// ENDPOINTS
app.get('/contact', (req, res)=>{

    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{

  var myData = new contact(req.body);
  myData.save().then(()=>{
      res.send("your feedback is saved in our database  ")
  }
  ).catch(()=>{
      res.status(400).send("items was not save to the database ")
  })

    // res.status(200).render('contact.pug');
})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

 //-  ham alt ko press karke 0169 ko press karenge toh copyright ka symbol ban jayega  ye pug template ke liye hai 