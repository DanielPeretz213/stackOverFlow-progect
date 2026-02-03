import mongoose from "mongoose";

const connectDB = async () => {
    const connect = await mongoose.connect(process.env.DB_CONNECTION!)
    .then(() => console.log("conected to DB"))
    .catch(() => console.log("samting went wrong with conect to DB"))
}

export default connectDB;