import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI){
            console.error('Missing MONGODB_URI enviroment variable');
            process.exit(1);
        }

        const conn = await mongoose.connect(`${ process.env.MONGODB_URI }/skillbridge`);

        console.log(`MongoDB connected ${ conn.connection.host }`);
    } catch(error) {
        console.error(`Error: ${ error.message }`);
        process.exit(1);
    }
}