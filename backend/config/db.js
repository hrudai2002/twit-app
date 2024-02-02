import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); 
        console.log('DB Connected');
    } catch (error) {
        console.log(`Error : ${error.message}`); 
        process.exit(1);
    }
}

export default connectDb;