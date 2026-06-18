import mongoose from 'mongoose';
// import {MONGO_URI} from '../../.env';
const link =`mongodb://localhost:27017/job_portal`;
if (!link) {
    throw new Error('MONGO_URI is not defined');
}
const connection=async()=>{
    try{
        console.log("Connecting to Database...",link);
        await mongoose.connect(link);
        console.log("Database Connected");
        mongoose.connection.once('open',()=>{
            console.log("Database Connection Established");
        })
    }catch(err){
        console.log("Database Connection Failed");
    }
}
export default connection;