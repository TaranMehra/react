import express from 'express';
import  {config}  from 'dotenv';
import cors from 'cors';
import { router } from './routes/index.js';
import { createDBConnection } from './lib/dbConnection.js';


config();


const app = express();

app.use(
    cors({
        // origin:"*"
        origin:"http://localhost:5173",
    }));


export const dbCon = await createDBConnection(); //establinshing db connection

// console.log("dbCon", dbCon?);
app.use(express.json());
app.use("/api", router);
app.get('/hello',(req, res)=>{
    return res.json({statusCode: 200});

})

const port = process.env.PORT || 3000;





app.listen(port, ()=> { 
        console.log(`Server running on ${port}`);
})
console.log("wokring")