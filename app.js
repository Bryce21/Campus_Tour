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


app.set('view engine', 'ejs');

//Define the Schemas
var studentSchema = new mongoose.Schema({
	name: String,
	major: String,
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

 app.get('/computer_science.html', function(req, res) {
 	res.sendFile(__dirname + "/computer_science.html");
 });

 app.get('/architecture.html', function(req, res) {
 	res.sendFile(__dirname + "/architecture.html");
 });

 app.get('/engineering.html', function(req, res) {
 	res.sendFile(__dirname + "/engineering.html");
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

 app.get('/notable_graduates.ejs', (req, res) => {
 	db.collection('students').find().toArray((err, result) => {
 		if (err) return console.log(err)
		// renders index.ejs
		res.render(__dirname+'/notable_graduates.ejs', {students: result})
	})
 })

 app.post("/addStudent", (req, res) => {
 	console.log(req.body);
 	var myData = new student(req.body);
 	myData.save()
 	.then(item => {
 		res.sendFile(__dirname+'/admissions.html');
 	})
 	.catch(err => {
 		res.status(400).send("unable to save to database");
 	});
 });

 

 app.post("/login", (req, res) => {
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



