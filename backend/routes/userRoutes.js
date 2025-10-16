import express from 'express';
import  {addUserByAdmin, deleteAccount, getAllStaffAccounts, handleResetPassword, handlefogetPassword, initiateCustomerLogin, registerUser, userLogin , verifyOtpAndLogin }  from '../controllers/userController.js';
import auth from '../middlewares/auth.js';
import checkPermission from '../middlewares/accessControl.js';

const userRouters = express.Router()

userRouters.get('/' , auth , checkPermission("readAny" , "user") , getAllStaffAccounts)
userRouters.post('/register', registerUser)
userRouters.post('/login', userLogin)
userRouters.post('/forgot-password', handlefogetPassword)
userRouters.post('/reset-password', handleResetPassword)
userRouters.post('/addAccount' , auth , checkPermission("createAny" , "user") , addUserByAdmin)
userRouters.delete('/:id/delete',auth, checkPermission("deleteAny" , "user") , deleteAccount)

userRouters.post('/customer/initiate' , initiateCustomerLogin)
userRouters.post('/verify/otp' , verifyOtpAndLogin)


export default userRouters;