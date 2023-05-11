
const Order = require('../models/orderModel')
const mongoose = require('mongoose')

exports.orders_get =  (req, res, next) => {
    
Order.find()
.populate('product')
.exec()
.then(doc => {
    const response = {
        count: doc.length,
        orders:doc.map(doc=>{
            return {
                _id: doc._id,
                product: doc.product,
                quantity: doc.quantity,
                request: {
                    Type:'GET',
                    url: 'http://127.0.0.1:3000/order/'+doc._id
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
exports.order_create_order = (req, res, next) => {

    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity
    })
    
    order.save()
    .then(result =>{
        res.status(200).json({
            message: 'Handling Request Post to /products ',
            creatProduct: result
        })
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error : err
        })
    })
    
}
exports.order_find_byId = (req, res, next) => {
    const id  = req.params.orderId 
    Order.findById(id)
    .select('product quantity _id')
    .populate('product','price name _id')
    .exec()
    .then(doc=>{
        console.log(doc)
        // check if the order is not null 
        if(doc){
            res.status(200).json(doc)
        } else{
            res.status(404).json({
                message:"Invalide ID Of This Order"
            })
        }
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({error: err})
    })
}

exports.order_patch = async (req, res, next) => {
    try{
        const ordertId = req.params.orderId
    const updates = {}
     // add only the properties to update to the `updates` object
     if (req.body.quantity) updates.quantity = req.body.quantity;
     if (req.body.product) updates.product = req.body.product;

      // find the order by ID
    const order = await Order.findById(ordertId);

     // update the order with the new information
     order.set(updates);

      // save the updated product to the database
    const updatedOrder = await order.save();
        // send the updated product as the response
    res.status(200).json(updatedOrder)

    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Failed to update order' });
    }
}
exports.order_deleteAll = (req, res, next) => {
    Order.deleteMany({})
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'All orders deleted',
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
  exports.order_delete_byId = (req, res, next) => {
    const id = req.params.orderId

    Order.findByIdAndDelete(id)
    .exec()
    .then(result =>{
        res.status(200).json(result)
    })
    .catch(err =>{
        res.status(200).json({error: err})
    })

}