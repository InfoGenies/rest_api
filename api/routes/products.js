
// here we try to create ours router 
const express = require('express')
const ProductController = require('../controller/product_controller')
const multer =  require('multer')
const checkAuth = require('../middleware/check-auth')




// this function *Router* give us the ability to handele different Routing with endpoint 
const router = express.Router()

const Product = require('../models/productModel')

// means here we want to store all file on this path(emplacement)  
const fs = require('fs')
const path = require('path')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // we use this line path.join to specify the real path automaticly
        const uploadDir = path.join(__dirname, `../../tmp/`);
       
        cb(null, uploadDir);
    },
    filename: function(req, file, cb) {
        const date = new Date().toISOString().replace(/:/g, '-');

        cb(null, date + '-' + file.originalname);
    }
});
const filterFile = (req, file, cb)=>{
    if(file.mimetype === "image/png"){
        // we give the permesion to store file(image that is png)
        cb(null,true)  
    }else{
        cb(null,false); 
    }
}

const upload =  multer({storage : storage , limits: {
    // we make this to prevent store a big size file(image)
    fileSize: 1024*1024*5 // 1 MB in bytes
  },
  fileFilter : filterFile
})
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