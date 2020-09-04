const express = require("express");

//Models
let Product = require("../models/Product.js");

const middleware = require("../middleware");

const router = express.Router();

//Index

router.get("/", 
    (req, res) =>
    {
        res.render("product/index");
        // Product.find({category: req.params.category},
        //     (err, foundProducts) =>
        //     {
        //         if(err)
        //         {
        //             console.log(err);
        //             res.redirect("/");
        //         }
        //         else
        //         {
        //             res.render("product/index", {products: foundProducts});
        //         }
        //     }
        // )
    }
)

//New

router.get("/new", middleware.isAdmin,
    (req, res) =>
    {
        res.render("product/new");
    }
)

//Create 

router.post("/", middleware.isAdmin,
    (req, res) =>
    {
        
    }
)

//Show 

router.get("/:id",
    (req, res) =>
    {

    }
)

//Edit

router.get("/:id/edit", middleware.isAdmin,
    (req, res) =>
    {
        Product.findById(req.params.id,
            function(err, foundProduct)
            {
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    res.render("product/edit", {product: foundProduct});
                }
            }
        )
    }
)

//Update

router.put("/:id", middleware.isAdmin,
    (req, res) =>
    {
        Product.findById(req.params.id,
            (err, foundProduct) =>
            {
                if(err)
                {
                    console.log(err);
                    res.redirect("/products/" + req.params.id + "/edit");
                }
                else
                {
                    Product.findByIdAndUpdate(req.params.id, foundProduct,
                        (err, updatedProduct) =>
                        {
                            if(err)
                            {
                                console.log(err);
                                res.redirect("/products/" + req.params.id + "/edit");
                            }
                            else
                            {
                                res.redirect("/products");
                            }
                        }
                    )
                }
            }    
        )
    }
)

//Destroy

router.delete("/:id", middleware.isAdmin,
    (req, res) =>
    {
        Product.findByIdAndRemove(req.params.id,
            (err) =>
            {
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    res.redirect("/products");
                }
            }    
        )
    }
)

module.exports = router;