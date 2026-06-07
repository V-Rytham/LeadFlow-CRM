import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import LeadRouter from "./routes/lead.routes.js"
import cors from "cors";
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";
import protect from "./controllers/authorise.controller.js";
// import addToDB from "./seed.js";
const app = express();

const port = process.env.PORT || 3000;


const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connection to MongoDB successful");
    } 
    catch(error) {
        console.log(`Error while connecting to DB: ${error}`);
        process.exit(1);
    }
};

app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));

app.use(express.urlencoded({
    extended:true
}));
app.use(cookieParser())

app.use(express.json())

app.get("/", (req,res)=>{
    res.status(200).json({
        message:"Server running"
    });
});


app.use("/api/auth", authRouter)
app.get("/me", protect, (req, res) => {
  res.json({
    user: req.user
  });
});
app.use("/api", LeadRouter)

const startServer = async () => {
    await connectToDB();

    app.listen(port, () => {
        console.log(`Listening at port ${port}`);
    });
};


startServer();