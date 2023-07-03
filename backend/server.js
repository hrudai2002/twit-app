import express from 'express'; 
import dotenv from 'dotenv'; 
dotenv.config();
import cookieParser from 'cookie-parser';
import connectDb from './config/db.js';
import userRoutes from './routes/userRoutes.js';


const port = process.env.PORT || 5000;

connectDb();



const app = express(); 


/*  know more about https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded */
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

app.use(cookieParser()); 

app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})


