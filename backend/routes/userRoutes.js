import express from 'express';
import  {addUserByAdmin, deleteAccount, initiateCustomerLogin, registerUser, userLogin , verifyAndLoginCustomer }  from '../controllers/userController.js';
import auth from '../middlewares/auth.js';
import checkPermission from '../middlewares/accessControl.js';

const userRouters = express.Router()

userRouters.post('/register', registerUser)
userRouters.post('/login', userLogin)
userRouters.post('/addAccount' , auth , checkPermission("createAny" , "user") , addUserByAdmin)
userRouters.delete('/:id/delete',auth, checkPermission("deleteAny" , "user") , deleteAccount)

userRouters.post('/customer/initiate' , initiateCustomerLogin)
userRouters.post('/customer/verify' , verifyAndLoginCustomer)


export default userRouters;