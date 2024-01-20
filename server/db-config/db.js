/** @format */

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectToDatabase = async () => {
	try {
		await mongoose.connect('mongodb+srv://satyamsingh748846:PUHMgkh4oYZOivbs@fakiapi.z7gawgs.mongodb.net/ecommerce?retryWrites=true&w=majority');
		console.log("Connected to MongoDB successfully");
	} catch (error) {
		console.log("Error connecting to database", error);
		process.exit(1);
	}
};

export default connectToDatabase;
