const express = require('express');
const Product = require('../models/product');
const router = express.Router();

// SEED
// const productSeed = require('../models/productSeed.js');

// router.get('/seed/', (req, res) => {
//     Product.deleteMany({}, (error, allProduct) => {});
//     Product.create(productSeed, (error, data) => {
//         res.redirect('/store');
//     });
// });

//INDEX.GET
router.get('/', (req, res) => {
    Product.find({}, (error, allProducts) => {   
        res.render("index.ejs", {
            products: allProducts,
        });
    });
});

//NEW.GET
router.get("/new", (req, res) => {
    res.render("new.ejs");
})
//DESTROY.DELETE
router.delete("/:id", (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect("/store")
    });
});

//UPDATE.PUT
router.put("/:id", (req, res) => {
    Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
  (error, updateProduct) => {
      res.redirect(`/store/${req.params.id}`)
  });
});

//Buy button route
router.post("/:id/buy", (req, res) => {
    Product.findById(req.params.id, (err, data) => {
        if (data.qty > 0) {
            data.qty--
            data.save(() => {
                res.redirect(`/store/${data.id}`)
            })
        } else {
            res.redirect(`/store/${data.id}`)
        }
    });
});
    
//CREATE.POST
router.post("/", (req, res) => {
    Product.create(req.body, (error, createdProduct) => {
        res.redirect('/store');
    });
});

//EDIT.GET
router.get("/:id/edit", (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
        res.render('edit.ejs', {
            product: foundProduct,
        });
    });
}) ;

//SHOW.GET
router.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('show.ejs', {
            product: foundProduct,
        });
    });
});

module.exports = router;