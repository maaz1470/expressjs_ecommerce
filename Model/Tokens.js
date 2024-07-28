import mongoose, { Schema } from "mongoose";

const TokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const Token = mongoose.model('tokens',TokenSchema)

export default Token;