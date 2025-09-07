import express from 'express';
import  {addUserByAdmin, registerUser, userLogin}  from '../controllers/userController.js';
import auth from '../middlewares/auth.js';
import checkPermission from '../middlewares/accessControl.js';

const userRouters = express.Router()

userRouters.post('/register', registerUser)
userRouters.post('/login', userLogin)
userRouters.post('/addAccount' , auth , checkPermission("createAny" , "user") , addUserByAdmin)



export default userRouters;