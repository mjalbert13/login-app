const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));


app.set("port", (process.env.PORT || 3000));

app.listen(app.get("port"),function(){
    console.log("App is listening on Port "+app.get("port"));
});