var express = require("express");
var app = express();
var port = 3000;

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/campus_db");
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Define the Schemas
var studentSchema = new mongoose.Schema({
	name: String,
	grade: String,
	age: Number
});

var userSchema = new mongoose.Schema({
	email: String,
	pw: String
});


var student = mongoose.model("Student", studentSchema);
var user = mongoose.model("Login", userSchema);

 // Home page route
 app.get('/', function(req, res) {
 	res.sendFile(__dirname + "/main.html");
 });

 app.get('/main.html', function(req, res) {
 	res.sendFile(__dirname + "/main.html");
 });

app.get('/math.html', function(req, res) {
	res.sendFile(__dirname + "/math.html");
});

app.get('/student_life.html', function(req, res) {
	res.sendFile(__dirname + "/student_life.html");
});

app.get('/login_page.html', function(req, res) {
	res.sendFile(__dirname + "/login_page.html");
});

app.get('/admissions.html', function(req, res) {
	res.sendFile(__dirname + "/admissions.html");
});

app.get('/about_us.html', function(req, res) {
	res.sendFile(__dirname + "/about_us.html");
});

app.post("/addStudent", (req, res) => {
	var myData = new student(req.body);
	myData.save()
	.then(item => {
		res.send("item saved to database");
	})
	.catch(err => {
		res.status(400).send("unable to save to database");
	});
});


app.post("/login", (req, res) => {
	console.log(req);
	var myData = new user(req.body);
	myData.save()
	.then(item => {
		res.send("User could log in if db setup correctly.");
	})
	.catch(err => {
		res.status(400).send("unable to save to database");
	});
});

app.listen(port, () => {
	console.log("Server listening on port " + port);
});



