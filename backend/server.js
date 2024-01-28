import express from 'express'; 
import cookieParser from 'cookie-parser';
import connectDb from './config/db.js';
import userRoutes from './routes/user.router.js';
import postsRoutes from './routes/posts.router.js';
import cors from 'cors';
import dotenv from 'dotenv'; 
dotenv.config();


const port = process.env.PORT || 5001;

connectDb();

const app = express(); 


/*  know more about https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded */
app.use(express.json()); 
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser()); 

app.use('/user', userRoutes);
app.use('/posts', postsRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})


