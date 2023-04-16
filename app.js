const express = require("express");
//express app
const app = express();

//const port = 3000;
const mongoose = require('mongoose'); //to connect to mongodb

//connect to mongodb and listen to requests
const dburl = 'mongodb+srv://vipul1:Test1234@nodetut.tqrfbx6.mongodb.net/student_results?retryWrites=true&w=majority' ;
mongoose.set('strictQuery',true) ;
mongoose.connect(dburl) 
.then((result) => app.listen(3069,'0.0.0.0')) // we want to listen for  after server is connected to mongodb
.catch((error) => console.log(error)) ;


//register view engine
app.set('view engine', 'ejs');
//middleware and static files
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded());

//express layouts
var expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

//teacher and student routes
const teachRoutes = require("./routes/teacherRoutes")
const studRoutes = require("./routes/studentRoutes")
app.use("/teacher",teachRoutes);
app.use("/student",studRoutes);

//routes
app.get("/", (req, res) => {
  res.render("index");
});

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});