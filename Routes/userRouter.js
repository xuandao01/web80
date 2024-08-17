import { Router } from "express";
import express from 'express';
import userController from "../Controller/userController.js";
import userMiddleware from "../Middleware/userMiddleware.js";
const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userMiddleware.validateInfo , userController.createUser);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.put('/forget-password/:id', userController.forgetPassword);

export default userRouter;