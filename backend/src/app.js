import express from "express";
import { createServer } from "node:http";// express server
import { connectToSocket } from "./controllers/socketManager.js";
import dotenv from "dotenv";
dotenv.config(); // load env variables

import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port", (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({ limit: "40kb" }));
//limit is for json data not to exceed 40,0000 character in data 
// Security → prevents DoS attacks.
// Performance → avoids memory waste.
// Developer experience → ensures req.body is usable.
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
    app.set("mongo_user")
    const connectionDb = await mongoose.connect(process.env.MONGO_URI) // connect db
    console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`)

    server.listen(app.get("port"), () => { // running app in server
        console.log("LISTENIN ON PORT 8000")
    });
}
start();