const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session')
const passport = require('passport');
const app = express();

//passport config
require('./config/passport')(passport);

//Mongo DB Set up
const db = require('./model');
mongoose.connect("mongodb://localhost/loginapp", { useNewUrlParser: true})

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Body parser
app.use(express.urlencoded({extended:false}));

//Session
app.use(session({
    secret: "login app",
    resave: true,
    saveUninitialized: true
}));

//passport
app.use(passport.initialize());
app.use(passport.session());

//flash
app.use(flash());

//Global Var
app.use((req, res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error')
    next();
});

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));


app.set("port", (process.env.PORT || 3000));

app.listen(app.get("port"),function(){
    console.log("App is listening on Port "+app.get("port"));
});