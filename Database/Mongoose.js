import mongoose from "mongoose";
import 'dotenv/config'

const connect = mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ecommerce.dt9rlzv.mongodb.net/?retryWrites=true&w=majority&appName=Ecommerce`,{
    dbName: 'ecom'
})
connect.then(() => console.log('mongodb is connected'))
        .catch(err => console.log('Error: ', err))

        