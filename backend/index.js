import express from "express";
import mongoose from "mongoose";
import { router } from "./routes/url.routes.js";
import 'dotenv/config'
import cors from "cors"
async function connectDB(uri){
    try {
        const connection = await mongoose.connect(uri)
        console.log("Database Connected");
        return connection;
    } catch (error) {
        console.log("Database Connection Failed:", error.message);
        throw error
        
    }
}


connectDB(process.env.URI);
const app = express();

const corsOptions = {
        origin: 'http://localhost:5173', // Allow requests only from this origin
        methods: ['GET', 'POST','PUT','DELETE'], // Allow specific HTTP methods
        // allowedHeaders: ['Content-Type'], // Allow specific headers
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api",router);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


