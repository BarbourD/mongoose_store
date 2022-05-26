//DEPENDENCIES
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const storeController = require('./controllers/products.js')
app.use(express.static('public'))

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
app.use(methodOverride('_method'));
app.use('/store', storeController);

//LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => {
console.log(`server listening on port: ${PORT}`)
});