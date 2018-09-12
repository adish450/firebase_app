var express = require("express"),
    admin = require("firebase-admin"),
    firebase = require("firebase"),
    app = express(),
    bodyParser = require("body-parser"),
    morgan = require("morgan"),
    nodemailer = require('nodemailer');

    // db = admin.database();
    
    
    
    

app.use(bodyParser.urlencoded({extended :true}));
app.use(bodyParser.json());
app.use(morgan('dev'));


// Initialize Firebase
// TODO: Replace with your project's customized code snippet
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBN51fYey0mj9eFli3ykltOpoyIEt4_RDw",
    authDomain: "fir-app-fb853.firebaseapp.com",
    databaseURL: "https://fir-app-fb853.firebaseio.com",
    projectId: "fir-app-fb853",
    storageBucket: "fir-app-fb853.appspot.com",
    messagingSenderId: "203748928249"
  };
  firebase.initializeApp(config);


var serviceAccount = require("./fir-app-fb853-firebase-adminsdk-isfer-a3a7fec64f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-app-fb853.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("restricted_access/secret_document");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});

app.set("view engine", "html");
app.use(express.static((__dirname)));
app.use(bodyParser());


// Get a reference to the database service
var database = firebase.database();
// var firebase = require('firebase');
// var firebaseui = require('firebaseui');

app.get("/",function(req,res){
    res.render("index.html");
});

app.post("/signup",function(req,res){
//     firebase.database().ref('users/').set({
//     username: "tanveer",
//     email: "tanveermohd797@gmail.com",
    
//   }).then(function(){
//       console.log("success");
//   }).catch(function(e){
//       console.log(e);
//   });
  
  var email = req.body.email;
    var password = req.body.password;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode,errorMessage);
    });
    
//   gracehop: {
//     date_of_birth: "December 9, 1906",
//     full_name: "Grace Hopper"
//   },
//   adish: {
//     date_of_birth: "December 9, 1998",
//     full_name: "Adish Irfan"
//   }
// });
});

app.listen(process.env.PORT,process.env.IP,function(){
    
    console.log("Server is running !");
});

app.post("/login",function(req,res){
    var email = req.body.email;
    var password = req.body.password;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(){
            res.send("Login Successful !");
            var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'demoapp87@gmail.com',
    pass: 'Demoapp@2018'
  }
});

var usersRef = ref.child("users");
usersRef.set({
  alanisawesome: {
    username:req.body.email
  }
});

var mailOptions = {
  from: 'demoapp87@gmail.com',
  to: email,
  subject: 'Dear <username>, Welcome to our app',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
            
        })
        .catch(function(error) {
  // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode,errorMessage);
        });
        
        
        
       
});