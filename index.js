import express from 'express';
import mongoose from 'mongoose';
import userRouter from './Routes/userRouter.js';
import commentRouter from './Routes/commentRouter.js';
mongoose.connect('mongodb+srv://xuandao9876:xuandao9876@cluster.vua1f1n.mongodb.net/web80?retryWrites=true&w=majority');

const app = express();
app.use(express.json());

app.use('/users' ,userRouter);
app.use('/comment', commentRouter);

app.listen(8080, () => {
    console.log('server running . . .');
})