import express from 'express';
import  {config}  from 'dotenv';
import cors from 'cors';
import { router } from './routes/index.js';
import { createDBConnection } from './lib/dbConnection.js';
import http from 'node:http';
import {Server} from 'socket.io'




config();


const app = express();

const httpServer = http.createServer(app);

//socket instance functions
export const socketInstanceMain = () =>{
    const io = new Server(httpServer);
    return io;
}



app.use(
    cors({
        // origin:"*",
        origin:"http://localhost:5173",
        credentials:true,
    }));


export const dbCon = await createDBConnection(); //establinshing db connection

// console.log("dbCon", dbCon?);
app.use(express.json());
app.use("/api", router);
app.get('/hello',(req, res)=>{
    console.log("hello guys");
    return res.json({statusCode: 200});

})

const port = process.env.PORT || 3000;





httpServer.listen(port, ()=> { 
        console.log(`Server running on ${port}`);
})
console.log("wokring")