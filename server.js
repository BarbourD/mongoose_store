//DEPENDENCIES
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require("./models/product.js");


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
// const productSeed = require('./models/productSeed.js');

// app.get('/store/seed/', (req, res) => {
//     Product.deleteMany({}, (error, allProduct) => {});
//     Product.create(productSeed, (error, data) => {
//         res.redirect('/store');
//     });
// });

//INDEX.GET
app.get('/store', (req, res) => {
    Product.find({}, (error, allProducts) => {   
        res.render("index.ejs", {
            products: allProducts,
        });
    });
});

//NEW.GET
app.get("/store/new", (req, res) => {
    res.render("new.ejs");
})
//DESTROY.DELETE

//UPDATE.PUT

//CREATE.POST
app.post("/store", (req, res) => {
    Product.create(req.body, (erroe, createProduct) => {
        res.redirect('/store');
    });
});

//EDIT.GET

//SHOW.GET
app.get('/store/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('show.ejs', {
            product: foundProduct,
        });
    });
});
//LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => {
console.log(`server listening on port: ${PORT}`)
});