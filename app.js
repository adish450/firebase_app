var express = require("express"),
    admin = require("firebase-admin"),
    // firebase = require("firebase"),
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
//   var config = {
//     apiKey: "AIzaSyBN51fYey0mj9eFli3ykltOpoyIEt4_RDw",
//     authDomain: "fir-app-fb853.firebaseapp.com",
//     databaseURL: "https://fir-app-fb853.firebaseio.com",
//     projectId: "fir-app-fb853",
//     storageBucket: "fir-app-fb853.appspot.com",
//     messagingSenderId: "203748928249"
//   };
//   firebase.initializeApp(config);


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
// var database = firebase.database();
// var firebase = require('firebase');
// var firebaseui = require('firebaseui');

app.get("/",function(req,res){
    res.render("index.html");
});

app.post("/signup",function(req,res){
    var email = req.body.email;
    var password = req.body.password;
    var username = req.body.username;
    
    
    var usersRef = ref.child("users");
usersRef.set({
    
    username: username,
    email: email,
    passowrd: password
  
})
    var usersRef = ref.child("userInformation");
usersRef.set({
    
    username: username,
    email: email,
    passowrd: password
  
}).then(function(){
      console.log("success");
      res.send("You have registered Successfully !! ");
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
      var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'demoapp87@gmail.com',
    pass: 'Demoapp@2018'
  }
});

var str = "Dear " + username + " ,Welcome to our app";

var mailOptions = {
    
  from: 'demoapp87@gmail.com',
  to: email,
  subject: str,
  text: str
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

app.listen(process.env.PORT,process.env.IP,function(){
    
    console.log("Server is running !");
});

app.post("/login",function(req,res){
    var email = req.body.email;
    var password = req.body.password;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(){
            res.send("Login Successful !");
            });
            
});            
