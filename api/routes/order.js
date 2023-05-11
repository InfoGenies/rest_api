
// here we try to create our router 
const express = require('express')
const checkAuth = require('../middleware/check-auth')
const OrderController = require('../controller/order_controller')


// this function *Router* give us the ability to handele different Routing with endpoint 
const router = express.Router()

router.get('/',checkAuth,OrderController.orders_get)

router.post('/', checkAuth,OrderController.order_create_order)

router.get('/:orderId',checkAuth,OrderController.order_find_byId)

router.patch('/:orderId',checkAuth,OrderController.order_patch)

// DELETE route to delete all order
router.delete('/', OrderController.order_deleteAll);


router.delete('/:orderId',checkAuth, OrderController.order_delete_byId)
module.exports = router;