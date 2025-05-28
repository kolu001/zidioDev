import mongoose from "mongoose";
const connectDB = async ()=>{
    mongoose.connection.on('connected', ()=>console.log("Database is now connected!"));

    await mongoose.connect(`${process.env.MONGODB_URI}/Zteam11_proj`)
};

export default connectDB;