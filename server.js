var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var flash = require("connect-flash");
var expressValidator = require("express-validator");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongo = require("mongodb");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/loginapp");
var db = mongoose.connection;

var routes = require("./routes/index");
var users = require("./routes/users");

var app = express();


//html view

//middle ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: "secert",
    saveUninitialized: true,
    resave: true
}));

app.use(expressValidator({
    errorFormater: function(param, msg, value) {
        var namespace = param.split(".")
        , root = namespace.shift()
        , formParam = root;

        while(namespace.length){
            formParam +="["+namespace.shift()+"]";
        }
        return{
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));
