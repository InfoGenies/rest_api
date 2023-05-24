
// here we try to create ours router 
const express = require('express')
const ProductController = require('../controller/product_controller')
const checkAuth = require('../middleware/check-auth')




// this function *Router* give us the ability to handele different Routing with endpoint 
const router = express.Router()

const Product = require('../models/productModel')


// We have put 2 handler (checkAuth and upload )
// the first one to check if the user is authentificated  , when the server verify the token it will pass to second handler   
// the seond is to give the appility to put the image file 
router.post('/',checkAuth,ProductController.create_product)

router.get('/',ProductController.get_products)
 
//  Routing =====> path + Contoroller 
 
// fetching by id 
router.get('/:productId',ProductController.get_product_byID)

// updating the exciting product 
router.patch('/:productId',ProductController.update_product)
// deleting the product by id 
router.delete('/:productId',ProductController.delete_product_byID)
// DELETE route to delete all products
router.delete('/', ProductController.deleteAll);

// this line means that if u want to use this function(router) in other file(class) u should export it  
module.exports = router