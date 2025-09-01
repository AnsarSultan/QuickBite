import express from 'express';
import  {registerUser, userLogin}  from '../controllers/userController.js';

const userRouters = express.Router()

userRouters.post('/register', registerUser)
userRouters.post('/login', userLogin)

export default userRouters;