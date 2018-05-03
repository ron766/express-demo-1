const express = require('express');
const http = require('http');
//json parser
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
//port
const port = process.env.PORT || 3000;

var app = express();


//app.set(key,value) engine
app.set('view engine', 'html');
app.engine('.html', require('ejs').renderFile);
app.set('views',__dirname+'/views');

 //middleware
 //to use built-in middleware
 app.use(express.static(__dirname + '/public'));

 //middleware
 app.use((req,res,next) => {
   var now = new Date().toString();
   console.log(`${now}`);
   next();
 });

 //display http
 app.get('/' , (req, res) => {
  //jsonParser
  res.render("jsonDisp", {
    data:{
      name: 'rohan',
      likes: ['riding' , 'eating']
    }
  });
 });

 //http route handlers -> json
 //to send json
 //calling json methods
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended:true}));

 //http route handlers

//new route 2 // for hbs
 app.get('/about',(req,res) => {
 	res.render('about.html' , {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
 });

 //for home page
 app.get('/home',(req,res) => {
   res.render('home.html' , {
    pageTitle: 'Home Page',
    currentYear: new Date().getFullYear(),
    welcomeMessage: 'Hi this is home'
  });
 });

//project page
app.get('/projects' , (req,res) => {
  res.render('projects.html' , {
    pageTitle: 'Project page' ,
    pageDescription: 'GitHub links of projects'
  });
});

/* new route 3*/
app.get('/bad',(req,res) => {
	res.send({
		errorMessage: 'Unable to handle request'
	});
});

 app.listen(port, () => {
 	console.log(`Server is up on port ${port}`);
 });
