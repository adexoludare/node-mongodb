const connectToDatabase = require('./models/db');
const path = require('path');
const express = require("express");
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const bodyparser = require('body-parser');
const studentController = require('./contollers/studentContoller');

// Calling the async function
connectToDatabase();
const app = express();
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json())
app.set("port", process.env.PORT || 3000)
app.get('/', (req, res) => {
    res.send(
        `<h2>Welcome to Students Database!!</h2>
        <h3>Click here to access the <b><a href="/student/list">Database</a></b></h3>
        `
    )
})

app.set('views', path.join(__dirname, "views"));

const hbs = exphbs.create({
    extname: "hbs",
    handlebars: allowInsecurePrototypeAccess(handlebars),
    defaultLayout: "MainLayout",
    layoutsDir: path.join(__dirname, "views/layouts"),
});

// configure handlebars
app.engine("hbs", hbs.engine);

app.set("view engine", "hbs");
app.use("/student", studentController)
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server started on port", port);
})