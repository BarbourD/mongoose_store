//DEPENDENCIES
const express = require('express');
const req = require('express/lib/request');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

//DATABASE CONNECTON
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + " is mongo not running?"));
db.on("connected", () => console.log("mongo connected"));
db.on("disconnected", () => console.log("mongo disconnected"));

//MIDDLEWARE
app.use(express.urlencoded({extend: true}));

//SEED
const storeSeed = require('./models/storeSeed.js');

//INDEX.GET
app.get('/', (req, res) => {

});

//NEW.GET

//DESTROY.DELETE

//UPDATE.PUT

//CREATE.POST

//EDIT.GET

//SHOW.GET

//LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => {
console.log(`server listening on port: ${PORT}`)
});