import mongoose from "mongoose";
import 'dotenv/config';

mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`)
.then(()=>{
    console.log('database connected');
})
.catch((err)=>{
    console.log('err : '+err);
})

export default mongoose;