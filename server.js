const express = require('express');
//loading handlebars
const hbs = require('hbs');

//port
const port = process.env.PORT || 3000;

var app = express();

// register partials
hbs.registerPartials(__dirname + '/views/partials');

//app.set(key,value)
app.set('view engine' , 'hbs');

 //middleware
 //to use built-in middleware
 app.use(express.static(__dirname + '/public'));

 //middleware
 app.use((req,res,next) => {
   var now = new Date().toString();
   console.log(`${now}`);
   next();
 });

 //http route handlers
 app.get('/' , (req, res) => {
 	/*res.send('<h1>Hello Express !!</h1>');*/

 	//to send json
 	res.send({
 		name: 'rohan',
 		likes: ['riding' , 'eating']
 	});
 });

//new route 2 // for hbs
 app.get('/about',(req,res) => {
 	res.render('about.hbs' , {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
 });

 //for home page
 app.get('/home',(req,res) => {
   res.render('home.hbs' , {
    pageTitle: 'Home Page',
    currentYear: new Date().getFullYear(),
    welcomeMessage: 'Hi this is home'
  });
 });

/* new route 3*/
app.get('/bad',(req,res) => {
	res.send({
		/*error: "Error handling request" */
		errorMessage: 'Unable to handle request'
	});
});

 app.listen(port, () => {
 	console.log(`Server is up on port ${port}`);
 });
