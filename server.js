const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require('mongoose');

const app = express();

//Mongo DB Set up
const db = require('./model');
mongoose.connect("mongodb://localhost/loginApp", { useNewUrlParser: true})

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Body parser
app.use(express.urlencoded({extended:false}));

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));


app.set("port", (process.env.PORT || 3000));

app.listen(app.get("port"),function(){
    console.log("App is listening on Port "+app.get("port"));
});