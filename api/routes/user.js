const express = require('express')
const UserController  = require('../controller/user_controller')
// this function *Router* give us the ability to handele different Routing with endpoint 
const router = express.Router()

// create the registratin route 
router.post('/register',UserController.signUp)

router.post('/login', UserController.signIn)
// deleting the user by id 
router.delete('/:userId',UserController.delete_user_byID)

// DELETE route to delete all user
router.delete('/', UserController.deleteAll);

router.get('/', UserController.get_users)
  
  // fetching by id 
router.get('/:userId',UserController.fetch_byID)

// this line means that if u want to use this function(router) in other file(class) u should export it  
module.exports = router