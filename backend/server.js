import express from 'express'; 
import cookieParser from 'cookie-parser';
import connectDb from './config/db.js';
import cors from 'cors';

// routes
import userRoutes from './routes/user.router.js';
import postsRoutes from './routes/posts.router.js';
import conversationRoutes from './routes/conversation.router.js';

import dotenv from 'dotenv'; 
dotenv.config();

const port = process.env.PORT || 5001;

connectDb(); // connecting database

const app = express(); 


/*  know more about https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded */
app.use(express.json()); 
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser()); 


// Logs requests
// app.use((req, res) => {
//     console.log(`${req.method} ${req.url}`);
// })

app.use('/user', userRoutes);
app.use('/posts', postsRoutes); 
app.use('/conversation', conversationRoutes);


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})


