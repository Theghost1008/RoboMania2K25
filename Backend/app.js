import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import http from "http"
import matchRoutes from "./routes/match.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app=express();
dotenv.config();

app.use(express.json())
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['set-cookie']
}))
app.use(cookieParser());
app.set('trust proxy',1);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store:MongoStore.create({
      mongoUrl:process.env.MONGODB_URL,
      collectionName:"sessions",
    }),
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 15,
      sameSite: "none"
    }
  }));

const server = http.createServer(app);
const io= new Server(server,{
  cors:{
    origin:"https://robomania-frontend.onrender.com",
    credentials: true,
  }
})

app.set('io',io);
io.on("connection",(socket)=>{
  console.log("New client connected id:", socket.id);
  socket.on("disconnect",()=>{
    console.log("client disconnect", socket.id);
  })
})

app.use("/api/match", matchRoutes);
app.use("/api/auth", authRoutes);

export {app,server}