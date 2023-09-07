import  express  from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import candidateRoutes from './src/routes/candidates.js';
import bodyParser from "body-parser";
const app=express();
import cors from 'cors';
app.use(cors());

dotenv.config();


const connect = async () =>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongoDB.");
    }catch(err){
        throw err;
    }
}

mongoose.connection.on("disconnected",()=>{
    console.log("mongoDB Disconnected");
})

mongoose.connection.on("connected",()=>{
    console.log("mongoDB Connected");
})
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use('/uploads', express.static('uploads'));
app.use('/candidates', candidateRoutes);
app.listen(8000,()=>{
    connect();
    console.log("Connected to Backend!")
})

