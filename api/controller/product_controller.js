const mongoose = require('mongoose')
const path = require('path')

const Product = require('../models/productModel')

exports.create_product = (req, res, next) => {
    // Access the uploaded file using req.files
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    // Process the uploaded file
    const file = req.files.image;
    // Save the file, validate it, or perform any required operations
  
    // Handle other product data
    const { title, description, price } = req.body;
    // Save the product details along with the file information
  
    res.status(200).json({ message: 'Product saved successfully' });
  }


exports.get_products = (req, res, next) => {
    
Product.find()
.select('name price _id productImage')
.exec()
.then(doc => {
    console.log(doc)
    const response = {
        count: doc.length,
        products:doc.map(doc=>{
            return {
                name: doc.name,
                price: doc.price,
                productImage: `http://127.0.0.1:3000/uploads/${path.basename(doc.productImage)}`,
                _id: doc._id,
                request: {
                    Type:'GET',
                    url: 'http://127.0.0.1:3000/products/'+doc._id
                }
            }
        })
    }
    res.status(200).json(response)
})
.catch(err =>{
    console.log(err)
    res.status(500).json({
        error: err
    })
})
  

}
exports.get_product_byID =  (req, res, next) => {
    const id = req.params.productId
    Product.findById(id)
    .select('name price _id productImage')
    .exec()
    .then(doc=>{
        console.log(doc)
        // check if the product is not null 
        if(doc)
        {res.status(200).json(doc)
        }else{

            res.status(404).json({
                message:"Invalide ID Of This Product"
            })
        }
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({error: err})
    })

    
}
exports.update_product =  async (req, res, next) => {


    try{
        const productId = req.params.productId
    const updates = {}
     // add only the properties to update to the `updates` object
     if (req.body.name) updates.name = req.body.name;
     if (req.body.price) updates.price = req.body.price;

      // find the product by ID
    const product = await Product.findById(productId);

     // update the product with the new information
     product.set(updates);

      // save the updated product to the database
    const updatedProduct = await product.save();
        // send the updated product as the response
    res.status(200).json(updatedProduct)

    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Failed to update product' });
    }

}
exports.delete_product_byID =  (req, res, next) => {
    const id = req.params.productId

    Product.findByIdAndDelete(id)
    .exec()
    .then(result =>{
        res.status(200).json(result)
    })
    .catch(err =>{
        res.status(200).json({error: err})
    })

}
exports.deleteAll =(req, res, next) => {
    Product.deleteMany({})
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'All products deleted',
          result: result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }