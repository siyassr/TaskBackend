
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

console.log("connection.string", process.env.CONNECTION_STRING);

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000
        });
        console.log(
            "Database connected:",
            connect.connection.host,
            connect.connection.name
        );
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

export default connectDb;
