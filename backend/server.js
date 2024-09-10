import express from 'express'
import dotenv from 'dotenv'
import db  from './config/db.connection.js'
import employeeRoute from './routes/routes.js'
dotenv.config();
import cors from 'cors'

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use('/api/',employeeRoute);

app.listen(8000,()=>{
    db.Connection;
    console.log('server started')
})